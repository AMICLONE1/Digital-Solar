import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const reserveSchema = z.object({
  projectId: z.string().uuid(),
  capacity: z.number().positive().max(20),
});

const PRICE_PER_KW = 50000; // ₹50,000 per kW

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectId, capacity } = reserveSchema.parse(body);

    // Verify project exists and is active
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, name, total_kw, status")
      .eq("id", projectId)
      .eq("status", "ACTIVE")
      .is("deleted_at", null)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not available" }, { status: 400 });
    }

    // Get available capacity blocks
    const { data: blocks, error: blocksError } = await supabase
      .from("capacity_blocks")
      .select("id, kw")
      .eq("project_id", projectId)
      .eq("status", "AVAILABLE")
      .order("kw", { ascending: true });

    if (blocksError) {
      console.error("Blocks fetch error:", blocksError);
      return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
    }

    // Check availability
    const availableKw = blocks?.reduce((sum, block) => sum + Number(block.kw || 0), 0) || 0;
    if (availableKw < capacity) {
      return NextResponse.json(
        { error: `Only ${availableKw.toFixed(1)} kW available` },
        { status: 400 }
      );
    }

    // Allocate capacity blocks (simplified - in production, use proper allocation algorithm)
    let remainingCapacity = capacity;
    const blocksToAllocate: string[] = [];

    for (const block of blocks || []) {
      if (remainingCapacity <= 0) break;
      const blockKw = Number(block.kw || 0);
      if (blockKw <= remainingCapacity) {
        blocksToAllocate.push(block.id);
        remainingCapacity -= blockKw;
      }
    }

    if (remainingCapacity > 0.1) {
      // Allow small rounding differences
      return NextResponse.json(
        { error: "Could not allocate exact capacity" },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = capacity * PRICE_PER_KW;

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        user_id: user.id,
        amount: totalAmount,
        type: "RESERVATION",
        status: "PENDING",
      })
      .select()
      .single();

    if (paymentError || !payment) {
      console.error("Payment creation error:", paymentError);
      return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
    }

    // Create allocations and update blocks in a transaction-like manner
    // Note: Supabase doesn't support transactions in the same way, so we'll do sequential updates
    const allocations = [];
    for (const blockId of blocksToAllocate) {
      // Create allocation
      const { data: allocation, error: allocError } = await supabase
        .from("allocations")
        .insert({
          user_id: user.id,
          capacity_block_id: blockId,
          payment_id: payment.id,
        })
        .select()
        .single();

      if (allocError) {
        console.error("Allocation creation error:", allocError);
        // Rollback: delete payment and previous allocations
        await supabase.from("payments").delete().eq("id", payment.id);
        for (const prevAlloc of allocations) {
          await supabase.from("allocations").delete().eq("id", prevAlloc.id);
        }
        return NextResponse.json({ error: "Failed to create allocation" }, { status: 500 });
      }

      allocations.push(allocation);

      // Update block status
      const { error: updateError } = await supabase
        .from("capacity_blocks")
        .update({
          status: "ALLOCATED",
          allocated_at: new Date().toISOString(),
        })
        .eq("id", blockId);

      if (updateError) {
        console.error("Block update error:", updateError);
        // Rollback
        await supabase.from("payments").delete().eq("id", payment.id);
        for (const prevAlloc of allocations) {
          await supabase.from("allocations").delete().eq("id", prevAlloc.id);
        }
        return NextResponse.json({ error: "Failed to update capacity block" }, { status: 500 });
      }
    }

    // TODO: Integrate with payment gateway (Razorpay/Stripe)
    // For now, return success with redirect to success page
    const allocationId = allocations[0]?.id || payment.id;

    return NextResponse.json({
      success: true,
      allocationId,
      paymentId: payment.id,
      amount: totalAmount,
      redirectUrl: `/reserve/success?allocationId=${allocationId}`,
      // Payment URL for future integration
      paymentUrl: `/payment?paymentId=${payment.id}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Reserve error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reservation failed" },
      { status: 500 }
    );
  }
}
