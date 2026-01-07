/**
 * Ledger Service
 * Append-only ledger for credit transactions
 */

import { prisma } from "@repo/database";
import { CreditLedgerType, CreditLedgerStatus } from "@repo/database";

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

/**
 * Create an immutable ledger entry
 */
export async function createLedgerEntry(
  params: CreateLedgerEntryParams
): Promise<string> {
  const entry = await prisma.creditLedger.create({
    data: {
      userId: params.userId,
      amount: params.amount,
      type: params.type,
      status: "PENDING",
      month: params.month,
      year: params.year,
      refId: params.refId,
      refType: params.refType,
      description: params.description,
    },
  });

  return entry.id;
}

/**
 * Confirm a ledger entry (mark as confirmed)
 */
export async function confirmLedgerEntry(entryId: string): Promise<void> {
  await prisma.creditLedger.update({
    where: { id: entryId },
    data: { status: "CONFIRMED" },
  });
}

/**
 * Get user's credit balance (earned - applied - expired)
 */
export async function getUserCreditBalance(userId: string): Promise<number> {
  const earned = await prisma.creditLedger.aggregate({
    where: {
      userId,
      type: "EARNED",
      status: "CONFIRMED",
    },
    _sum: { amount: true },
  });

  const applied = await prisma.creditLedger.aggregate({
    where: {
      userId,
      type: "APPLIED",
      status: "CONFIRMED",
    },
    _sum: { amount: true },
  });

  const expired = await prisma.creditLedger.aggregate({
    where: {
      userId,
      type: "EXPIRED",
      status: "CONFIRMED",
    },
    _sum: { amount: true },
  });

  const balance =
    (earned._sum.amount || 0) - (applied._sum.amount || 0) - (expired._sum.amount || 0);

  return Math.max(0, balance);
}

/**
 * Get available credits for bill payment (non-expired, confirmed)
 */
export async function getAvailableCredits(userId: string): Promise<number> {
  const earned = await prisma.creditLedger.aggregate({
    where: {
      userId,
      type: "EARNED",
      status: "CONFIRMED",
    },
    _sum: { amount: true },
  });

  const applied = await prisma.creditLedger.aggregate({
    where: {
      userId,
      type: "APPLIED",
      status: "CONFIRMED",
    },
    _sum: { amount: true },
  });

  const expired = await prisma.creditLedger.aggregate({
    where: {
      userId,
      type: "EXPIRED",
      status: "CONFIRMED",
    },
    _sum: { amount: true },
  });

  const available =
    (earned._sum.amount || 0) - (applied._sum.amount || 0) - (expired._sum.amount || 0);

  return Math.max(0, available);
}

/**
 * Apply credits to a bill
 */
export async function applyCreditsToBill(
  userId: string,
  billId: string,
  amount: number
): Promise<string> {
  const available = await getAvailableCredits(userId);

  if (available < amount) {
    throw new Error(`Insufficient credits. Available: ₹${available}, Requested: ₹${amount}`);
  }

  const entry = await prisma.creditLedger.create({
    data: {
      userId,
      amount,
      type: "APPLIED",
      status: "CONFIRMED",
      refId: billId,
      refType: "BILL",
      description: `Credits applied to bill ${billId}`,
    },
  });

  return entry.id;
}

/**
 * Get ledger entries for a user
 */
export async function getUserLedgerEntries(
  userId: string,
  options?: {
    type?: CreditLedgerType;
    month?: number;
    year?: number;
    limit?: number;
  }
) {
  return prisma.creditLedger.findMany({
    where: {
      userId,
      type: options?.type,
      month: options?.month,
      year: options?.year,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: options?.limit || 100,
  });
}

