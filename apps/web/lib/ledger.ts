/**
 * Ledger Service
 * Append-only ledger for credit transactions
 * Updated to use Supabase
 */

export type CreditLedgerType = "EARNED" | "APPLIED" | "EXPIRED" | "REFUNDED";
export type CreditLedgerStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface CreateLedgerEntryParams {
  userId: string;
  amount: number;
  type: CreditLedgerType;
  month?: number;
  year?: number;
  refId?: string;
  refType?: string;
  description?: string;
}

export interface LedgerEntry {
  id: string;
  user_id: string;
  amount: number;
  type: CreditLedgerType;
  status: CreditLedgerStatus;
  month?: number;
  year?: number;
  ref_id?: string;
  ref_type?: string;
  description?: string;
  created_at: string;
}

/**
 * Get available credits for a user
 * Uses Supabase client passed as parameter
 */
export async function getAvailableCredits(
  userId: string,
  supabase: any
): Promise<number> {
  try {
    // Get all confirmed earned credits
    const { data: earned } = await supabase
      .from("credit_ledgers")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "EARNED")
      .eq("status", "CONFIRMED");

    const totalEarned = earned?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    // Get all applied credits
    const { data: applied } = await supabase
      .from("credit_ledgers")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "APPLIED")
      .eq("status", "CONFIRMED");

    const totalApplied = applied?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    // Get all expired credits
    const { data: expired } = await supabase
      .from("credit_ledgers")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "EXPIRED")
      .eq("status", "CONFIRMED");

    const totalExpired = expired?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    return Math.max(0, totalEarned - totalApplied - totalExpired);
  } catch (error) {
    console.error("Error calculating available credits:", error);
    return 0;
  }
}

/**
 * Create an immutable ledger entry
 * Uses Supabase client passed as parameter
 */
export async function createLedgerEntry(
  params: CreateLedgerEntryParams,
  supabase: any
): Promise<string> {
  const { data, error } = await supabase
    .from("credit_ledgers")
    .insert({
      user_id: params.userId,
      amount: params.amount,
      type: params.type,
      status: "PENDING",
      month: params.month,
      year: params.year,
      ref_id: params.refId,
      ref_type: params.refType,
      description: params.description,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`Failed to create ledger entry: ${error?.message}`);
  }

  return data.id;
}

/**
 * Confirm a ledger entry (mark as confirmed)
 */
export async function confirmLedgerEntry(
  entryId: string,
  supabase: any
): Promise<void> {
  const { error } = await supabase
    .from("credit_ledgers")
    .update({ status: "CONFIRMED" })
    .eq("id", entryId);

  if (error) {
    throw new Error(`Failed to confirm ledger entry: ${error.message}`);
  }
}

/**
 * Apply credits to a bill
 */
export async function applyCreditsToBill(
  userId: string,
  billId: string,
  amount: number,
  supabase: any
): Promise<string> {
  // Create APPLIED ledger entry
  const ledgerId = await createLedgerEntry(
    {
      userId,
      amount,
      type: "APPLIED",
      refId: billId,
      refType: "BILL",
      description: `Credits applied to bill ${billId}`,
    },
    supabase
  );

  // Confirm immediately
  await confirmLedgerEntry(ledgerId, supabase);

  return ledgerId;
}

/**
 * Get user ledger entries
 */
export async function getUserLedgerEntries(
  userId: string,
  options: {
    type?: CreditLedgerType;
    month?: number;
    year?: number;
    limit?: number;
  },
  supabase: any
): Promise<LedgerEntry[]> {
  let query = supabase
    .from("credit_ledgers")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(options.limit || 100);

  if (options.type) {
    query = query.eq("type", options.type);
  }

  if (options.month) {
    query = query.eq("month", options.month);
  }

  if (options.year) {
    query = query.eq("year", options.year);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch ledger entries: ${error.message}`);
  }

  return (data || []).map((entry: any) => ({
    id: entry.id,
    user_id: entry.user_id,
    amount: entry.amount,
    type: entry.type,
    status: entry.status,
    month: entry.month,
    year: entry.year,
    ref_id: entry.ref_id,
    ref_type: entry.ref_type,
    description: entry.description,
    created_at: entry.created_at,
  }));
}
