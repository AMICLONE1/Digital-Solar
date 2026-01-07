import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should display login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Welcome Back")).toBeVisible();
    await expect(page.getByPlaceholder("9876543210")).toBeVisible();
  });

  test("should show error for invalid phone number", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="tel"]', "123");
    await page.click('button:has-text("Send OTP")');
    // Should show validation error
  });
});

