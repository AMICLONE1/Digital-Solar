/**
 * Credit Calculation Engine
 * Immutable, versioned calculation logic for solar credits
 */

export interface CreditCalculationParams {
  userKw: number;
  totalProjectKw: number;
  actualGenerationKwh: number;
  fixedCreditRate: number; // ₹ per kWh
  month: number;
  year: number;
}

export interface CreditCalculationResult {
  creditAmount: number;
  formulaVersion: string;
  calculationDetails: {
    userShare: number;
    userGeneration: number;
    creditAmount: number;
  };
}

const FORMULA_VERSION = "v1.0.0";

/**
 * Calculate monthly credits for a user
 * Formula: (User_kW / Total_Project_kW) × Actual_Generation_kWh × Fixed_Credit_Rate
 */
export function calculateCredits(params: CreditCalculationParams): CreditCalculationResult {
  const { userKw, totalProjectKw, actualGenerationKwh, fixedCreditRate } = params;

  // Validate inputs
  if (userKw <= 0 || totalProjectKw <= 0 || actualGenerationKwh < 0 || fixedCreditRate <= 0) {
    throw new Error("Invalid calculation parameters");
  }

  if (userKw > totalProjectKw) {
    throw new Error("User capacity cannot exceed project capacity");
  }

  // Calculate user's share of generation
  const userShare = userKw / totalProjectKw;
  const userGeneration = actualGenerationKwh * userShare;
  const creditAmount = userGeneration * fixedCreditRate;

  return {
    creditAmount: Math.round(creditAmount * 100) / 100, // Round to 2 decimal places
    formulaVersion: FORMULA_VERSION,
    calculationDetails: {
      userShare,
      userGeneration,
      creditAmount,
    },
  };
}

/**
 * Batch calculate credits for multiple users
 */
export function batchCalculateCredits(
  users: Array<{ userId: string; userKw: number }>,
  params: Omit<CreditCalculationParams, "userKw">
): Array<{ userId: string; creditAmount: number; calculationDetails: any }> {
  return users.map((user) => {
    const result = calculateCredits({
      ...params,
      userKw: user.userKw,
    });

    return {
      userId: user.userId,
      creditAmount: result.creditAmount,
      calculationDetails: result.calculationDetails,
    };
  });
}

/**
 * Validate generation data for outliers
 */
export function validateGeneration(
  kwh: number,
  expectedRange: { min: number; max: number }
): { valid: boolean; reason?: string } {
  if (kwh < expectedRange.min) {
    return {
      valid: false,
      reason: `Generation (${kwh} kWh) below expected minimum (${expectedRange.min} kWh)`,
    };
  }

  if (kwh > expectedRange.max) {
    return {
      valid: false,
      reason: `Generation (${kwh} kWh) above expected maximum (${expectedRange.max} kWh)`,
    };
  }

  return { valid: true };
}

/**
 * Interpolate missing generation data
 */
export function interpolateGeneration(
  previousKwh: number,
  nextKwh: number,
  monthsBetween: number
): number {
  if (monthsBetween <= 0) {
    throw new Error("Invalid months between");
  }

  // Linear interpolation
  return (previousKwh + nextKwh) / 2;
}

