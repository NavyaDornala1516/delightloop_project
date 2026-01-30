import { ContactListPage } from "./../src/pages/ContactListPage";
import { DashboardPage } from "./../src/pages/DashboardPage";
import { LoginPage } from "./../src/pages/LoginPage";
import { test, expect } from "@playwright/test";

test("Contact List link should open", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const contactListPage = new ContactListPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

  await dashboardPage.verifyDashboard();
  await dashboardPage.verifyContactListsVisible();
  await dashboardPage.clickContactLists();
  await contactListPage.verifyContactListPage();
});

test("Add Contact button should display", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const contactListPage = new ContactListPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

  await dashboardPage.verifyDashboard();

  await dashboardPage.verifyContactListsVisible();
  await dashboardPage.clickContactLists();
  await contactListPage.verifyContactListPage();
  await contactListPage.verifyingAddContactBtn();
});

test("Open Add Contact", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const contactListPage = new ContactListPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

  await dashboardPage.verifyDashboard();

  await dashboardPage.verifyContactListsVisible();
  await dashboardPage.clickContactLists();
  await contactListPage.verifyContactListPage();
  await contactListPage.verifyingAddContactBtn();
});

test("Close Add Contact ", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const contactListPage = new ContactListPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

  await dashboardPage.verifyDashboard();

  await dashboardPage.verifyContactListsVisible();
  await dashboardPage.clickContactLists();

  await contactListPage.verifyContactListPage();
  await contactListPage.verifyingAddContactBtnClickable();
  await contactListPage.verifyingCloseIcon();
});
