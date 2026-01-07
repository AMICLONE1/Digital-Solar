import { calculateCredits, validateGeneration } from "@/lib/credit-engine";

describe("Credit Engine", () => {
  describe("calculateCredits", () => {
    it("should calculate credits correctly", () => {
      const result = calculateCredits({
        userKw: 5,
        totalProjectKw: 100,
        actualGenerationKwh: 10000,
        fixedCreditRate: 6.5,
        month: 1,
        year: 2024,
      });

      expect(result.creditAmount).toBe(3250); // (5/100) * 10000 * 6.5
      expect(result.formulaVersion).toBe("v1.0.0");
      expect(result.calculationDetails.userShare).toBe(0.05);
      expect(result.calculationDetails.userGeneration).toBe(500);
    });

    it("should throw error for invalid parameters", () => {
      expect(() => {
        calculateCredits({
          userKw: 0,
          totalProjectKw: 100,
          actualGenerationKwh: 10000,
          fixedCreditRate: 6.5,
          month: 1,
          year: 2024,
        });
      }).toThrow("Invalid calculation parameters");
    });

    it("should throw error if user capacity exceeds project capacity", () => {
      expect(() => {
        calculateCredits({
          userKw: 150,
          totalProjectKw: 100,
          actualGenerationKwh: 10000,
          fixedCreditRate: 6.5,
          month: 1,
          year: 2024,
        });
      }).toThrow("User capacity cannot exceed project capacity");
    });
  });

  describe("validateGeneration", () => {
    it("should validate generation within expected range", () => {
      const result = validateGeneration(1000, { min: 800, max: 2000 });
      expect(result.valid).toBe(true);
    });

    it("should reject generation below minimum", () => {
      const result = validateGeneration(500, { min: 800, max: 2000 });
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("below expected minimum");
    });

    it("should reject generation above maximum", () => {
      const result = validateGeneration(2500, { min: 800, max: 2000 });
      expect(result.valid).toBe(false);
      expect(result.reason).toContain("above expected maximum");
    });
  });
});

