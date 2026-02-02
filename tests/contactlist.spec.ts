import { test, expect } from "@playwright/test";
import { DashboardPage } from "./../src/pages/DashboardPage";
import { ContactListPage } from "./../src/pages/ContactListPage";

test.describe("Contact List Tests", () => {
  let dashboardPage: DashboardPage;
  let contactListPage: ContactListPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    contactListPage = new ContactListPage(page);

    await page.goto("/dashboard");

    await dashboardPage.verifyDashboard();
    await dashboardPage.verifyContactListsVisible();
    await dashboardPage.clickContactLists();
    await contactListPage.verifyContactListPage();
  });

  test("Contact List link should open", async () => {
    expect(true).toBeTruthy();
  });

  test("Add Contact button should be visible", async () => {
    await contactListPage.verifyingAddContactBtn();
  });

  test("Add Contact button should be clickable and open the panel", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
  });

  test("Close Add Contact modal", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyingCloseIcon();
  });

  test("Validate creating a contact with all fields", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.createContactWithAllFields();
  });

  test("Mandatory fields validation on Add Contact", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyingMandatoryFields();
  });

  test("Validating Mandatory field empty", async () => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyingEmptyFields();
  });

  test("Validating First Name Empty", async ({ page }) => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyingFirstNameEmpty();
  });

  test("Validating Last Name Empty", async ({ page }) => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyingLastNameEmpty();
  });

  test("Validating Email Name Empty", async ({ page }) => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.verifyingEmailEmpty();
  });

  test("Validating Invalid Email format", async ({ page }) => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.submitInvalidEmail(email);
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

  test("Validate search functionality for newly created contact", async ({
    page,
  }) => {
    await contactListPage.searchContact(email);
    await contactListPage.verifyContactVisible(email);
  });

  test("validating creating a contact with existing email id", async ({
    page,
  }) => {
    const existingEmail = "navyatesitng@gmail.com";

    await contactListPage.verifyingCreatingContact();
    await contactListPage.submitInvalidEmail(existingEmail);
  });

  test("Validating creating account with Invalid phone Number", async ({
    page,
  }) => {
    const invalidPhone = "abc123";

    await contactListPage.verifyingCreatingContact();
    await contactListPage.submitInvalidPhone(invalidPhone);

    await expect(
      page.getByText(/contact created successfully/i),
    ).not.toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Create New Contact" }),
    ).toBeVisible();
  });

  test("Validate creating a contact with only spaces in mandatory fields", async ({
    page,
  }) => {
    await contactListPage.verifyingCreatingContact();
    await contactListPage.submitWithOnlySpaces();
    await contactListPage.verifySpacesValidation();

    await expect(
      page.getByText(/contact created successfully/i),
    ).not.toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Create New Contact" }),
    ).toBeVisible();
  });

  test("Validate creating a contact with maximum length First Name", async ({
    page,
  }) => {
    const contactListPage = new ContactListPage(page);

    const maxFirstName = "A".repeat(50); // adjust if max length differs
    const email = `max.fn.${Date.now()}@example.com`;

    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyingMandatoryFields(maxFirstName, "User", email);

    await expect(contactListPage.successText).toBeVisible();
  });

  test("Validate creating a contact with maximum length Last Name", async ({
    page,
  }) => {
    const contactListPage = new ContactListPage(page);

    const maxLastName = "B".repeat(50);
    const email = `max.ln.${Date.now()}@example.com`;

    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyingMandatoryFields("Test", maxLastName, email);

    await expect(contactListPage.successText).toBeVisible();
  });

  test("Validate creating a contact with special characters in name", async ({
    page,
  }) => {
    const contactListPage = new ContactListPage(page);

    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyingMandatoryFields(
      "Test@#$",
      "User",
      `special.${Date.now()}@example.com`,
    );

    await expect(contactListPage.firstNameError).toBeVisible();
    await expect(contactListPage.successText).not.toBeVisible();
  });

  test("Validate creating a contact with numeric values in name", async ({
    page,
  }) => {
    const contactListPage = new ContactListPage(page);

    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyingMandatoryFields(
      "Test123",
      "User",
      `numeric.${Date.now()}@example.com`,
    );
    await contactListPage.submitForm();

    await expect(contactListPage.firstNameError).toBeVisible();
    await expect(contactListPage.successToast).not.toBeVisible();
  });

  test("Validate creating a contact with Unicode characters in name", async ({
    page,
  }) => {
    const contactListPage = new ContactListPage(page);

    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyingMandatoryFields(
      "测试用户",
      "测试",
      `unicode.${Date.now()}@example.com`,
    );

    await expect(contactListPage.firstNameError).toBeVisible();
  });

  test("Validate creating a contact with uppercase Email ID", async ({
    page,
  }) => {
    const contactListPage = new ContactListPage(page);

    const email = `UPPERCASE.${Date.now()}@EXAMPLE.COM`;

    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyingMandatoryFields("Upper", "Case", email);

    await expect(contactListPage.successText).toBeVisible();
  });

  test("Validate creating a contact with same name and different Email", async ({
    page,
  }) => {
    const contactListPage = new ContactListPage(page);

    const email1 = `same.name.${Date.now()}@example.com`;
    const email2 = `same.name.${Date.now() + 1}@example.com`;

    // First contact
    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyingMandatoryFields("Same", "User", email1);
    await expect(contactListPage.successText).toBeVisible();

    // Second contact with same name, different email
    await contactListPage.verifyingCreatingContact();
    await contactListPage.verifyingMandatoryFields("Same", "User", email2);
    await expect(contactListPage.successText).toBeVisible();
  });
});
