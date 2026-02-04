import { test, expect } from "@playwright/test";

test("auth setup - save login session", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Enter your email")
    .fill(process.env.TEST_EMAIL!);

  await page.locator('input[name="password"]')
    .fill(process.env.TEST_PASSWORD!);

  await page.getByRole("button", { name: /sign in/i }).click();

  // await page.waitForURL(/dashboard/, { timeout: 20000 });

  await expect(
    page.getByPlaceholder("Enter your email")
  ).not.toBeVisible();

  await page.context().storageState({
    path: "auth/auth.json",
  });
});
