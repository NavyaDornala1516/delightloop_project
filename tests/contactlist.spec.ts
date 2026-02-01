import { test, expect } from "@playwright/test";
import { LoginPage } from "./../src/pages/LoginPage";
import { DashboardPage } from "./../src/pages/DashboardPage";
import { ContactListPage } from "./../src/pages/ContactListPage";

test.describe("Contact List Tests", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let contactListPage: ContactListPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    contactListPage = new ContactListPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);

    await dashboardPage.verifyDashboard();
    await dashboardPage.verifyContactListsVisible();
    await dashboardPage.clickContactLists();
    await contactListPage.verifyContactListPage();
  });

  test("Contact List link should open", async () => {
    // Covered by beforeEach
    // This test ensures navigation works
    expect(true).toBeTruthy();
  });

  test("Add Contact button should be visible", async () => {
    await contactListPage.verifyingAddContactBtn();
  });

  test("Add Contact button should be clickable", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
  });

  test("Open Add Contact modal", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyAddContactModalOpened();
  });

  test("Close Add Contact modal", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyingCloseIcon();
  });

  test("Mandatory fields validation on Add Contact", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyingEmptyFields();
  });

  test("Validate creating a contact with all fields", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.createContactWithAllFields();
  });

  test("validate newly created contact appears in all contacts", async ({
    page,
  }) => {
    await contactListPage.switchToAllContacts();
    await contactListPage.searchContact(email);
    await contactListPage.verifyContactPresent(email);
  });

  test("Validate contact count increment after creation", async ({ page }) => {
    const countBefore = await contactListPage.getContactCount();
    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyContactCountIncremented(countBefore);
  });
});
