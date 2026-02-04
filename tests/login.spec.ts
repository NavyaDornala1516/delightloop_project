// import { DashboardPage } from "./../src/pages/DashboardPage";
// import { log } from "node:console";
// import { LoginPage } from "../src/pages/LoginPage";
// import { test, expect } from "@playwright/test";

// test("Valid Login Test", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const dashboardPage = new DashboardPage(page);

//   await loginPage.goto();
//   await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

//   await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
//   await dashboardPage.verifyDashboard();
// });
