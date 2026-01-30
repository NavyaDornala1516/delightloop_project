import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { DashboardPage } from "../src/pages/DashboardPage";
import { ContactListPage } from "../src/pages/ContactListPage";

test("Add Contact panel should open", async ({ page }) => {

  const loginPage =  new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const contactListPage = new ContactListPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

  await dashboardPage.verifyContactListsVisible();

  await dashboardPage.clickContactLists();

  await contactListPage.verifyContactListPage();

});
