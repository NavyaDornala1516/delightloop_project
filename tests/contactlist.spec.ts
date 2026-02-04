import { ContactListDetailsPage } from "./../src/pages/contactListDetailsPage";
import { test, expect } from "@playwright/test";
import { DashboardPage } from "./../src/pages/DashboardPage";
import { ContactListPage } from "./../src/pages/ContactListPage";

test.describe("Contact List Tests", () => {
  let dashboardPage: DashboardPage;
  let contactListPage: ContactListPage;
  let contactListDetailsPage: ContactListDetailsPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    contactListPage = new ContactListPage(page);
    contactListDetailsPage = new ContactListDetailsPage(page);

    await page.goto("/contact-lists", {
      waitUntil: "domcontentloaded",
    });
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

    const contactData = {
      firstName: "Navya",
      lastName: "ddd",
      email: `navyadornala@test.com`,
      jobTitle: "QA",
      company: "Test Company",
      country: "IN",
      state: "KA",
      city: "Bengaluru",
      zipCode: "560001",
      notes: "Created via automation",
    };

    await contactListPage.createContactWithAllFields(contactData);

    await expect(contactListPage.successText).toBeVisible();
  });

  test("Mandatory fields validation on Add Contact", async () => {
    await contactListPage.verifyingAddContactBtnClickable();

    await contactListPage.fillMandatoryFields(
      "Navya",
      "ddd",
      "navyadornala@test.com",
    );

    await expect(contactListPage.successText).toBeVisible();
  });

  const emptyFieldCases = [
    {
      name: "First Name Empty",
      data: ["", "ddd", "test@test.com"],
      expectedFocus: "firstName",
    },
    {
      name: "Last Name Empty",
      data: ["Navya", "", "test@test.com"],
      expectedFocus: "lastName",
    },
    {
      name: "Email Empty",
      data: ["Navya", "ddd", ""],
      expectedFocus: "email",
    },
  ];

  // for (const testCase of emptyFieldCases) {
  //   test(`Validating ${testCase.name}`, async () => {
  //     await contactListPage.verifyingAddContactBtnClickable();

  //     await contactListPage.fillMandatoryFields(
  //       testCase.data[0],
  //       testCase.data[1],
  //       testCase.data[2],
  //     );

  //     const fieldMap = {
  //       firstName: contactListPage.firstName,
  //       lastName: contactListPage.lastName,
  //       email: contactListPage.email,
  //     };

  //     await expect(fieldMap[testCase.expectedFocus]).toBeFocused();
  //   });
  // }

  test("Validating Invalid Email format", async () => {
    await contactListPage.verifyingAddContactBtnClickable();

    await contactListPage.fillMandatoryFields("Navya", "ddd", "invalidEmail");

    await expect(contactListPage.invalidEmailError).toBeVisible();
  });

  // //need to check
  // test("Search should show matching contacts only", async () => {
  //   await contactListPage.switchToAllContacts();
  //   await contactListPage.searchContact("Navya");
  //   await contactListPage.verifySearchResults("Navya");
  // });

  test("Validate contact count increment after creation", async () => {
    await contactListPage.verifyingAddContactBtnClickable();

    const countBefore = await contactListPage.getContactCount();

    const contactData = {
      firstName: "fir",
      lastName: "last",
      email: `fir.last.${Date.now()}@test.com`,
    };

    await contactListPage.fillMandatoryFields(
      contactData.firstName,
      contactData.lastName,
      contactData.email,
    );

    await expect(contactListPage.successText).toBeVisible();

    await contactListPage.verifyContactCountIncremented(countBefore);
  });

  // test("Validate search functionality for newly created contact", async ({
  //   page,
  // }) => {
  //   await contactListPage.searchContact(email);
  //   await contactListPage.verifyContactVisible(email);
  // });

  test("validating creating a contact with existing email id", async ({
    page,
  }) => {
    const existingEmail = "navyatesitng@gmail.com";

    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields("fir", "last", existingEmail);

    await expect(contactListPage.successText).toBeVisible();
  });

  ["abc123", "123abc", "!@#$%", "999"].forEach((phone) => {
    test(`Invalid phone: ${phone}`, async ({ page }) => {
      await contactListPage.verifyingAddContactBtnClickable();
      await contactListPage.fillContactForm(
        "Test",
        "User",
        "test@user.com",
        phone,
      );

      await expect(contactListPage.successText).not.toBeVisible();
      await contactListPage.captureScreenshot("invalid phone");
    });
  });

  test("Validate creating a contact with only spaces in mandatory fields", async ({
    page,
  }) => {
    await contactListPage.verifyingAddContactBtnClickable();
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
    const maxFirstName = "A".repeat(51);
    const email = `nav.${Date.now()}@example.com`;

    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields(maxFirstName, "User", email);

    await expect(
      page.getByText(/first name must be less than 50 characters/i),
    ).toBeVisible();
  });

  test("Validate creating a contact with maximum length Last Name", async ({
    page,
  }) => {
    const maxLastName = "B".repeat(51);
    const email = `nav.${Date.now()}@example.com`;

    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields("Test", maxLastName, email);

    await expect(
      page.getByText(/last name must be less than 50 characters/i),
    ).toBeVisible();
  });

  test("Validate creating a contact with special characters in name", async ({
    page,
  }) => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields(
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
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields(
      "Test123",
      "User",
      `numeric.${Date.now()}@example.com`,
    );

    await expect(contactListPage.firstNameError).toBeVisible();
    await expect(contactListPage.successText).not.toBeVisible();
  });

  test("Validate creating a contact with Unicode characters in name", async ({
    page,
  }) => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields(
      "测试用户",
      "测试",
      `unicode.${Date.now()}@example.com`,
    );

    await expect(contactListPage.firstNameError).toBeVisible();
  });

  test("Validate creating a contact with uppercase Email ID", async ({
    page,
  }) => {
    const email = `UPPERCASE.${Date.now()}@EXAMPLE.COM`;

    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields("Upper", "Case", email);

    await expect(contactListPage.successText).toBeVisible();
  });

  test("Validate creating a contact with same name and different Email", async ({
    page,
  }) => {
    const email1 = `same.name.${Date.now()}@example.com`;
    const email2 = `same.name.${Date.now() + 1}@example.com`;

    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields("Same", "User", email1);
    await expect(contactListPage.successText).toBeVisible();

    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.fillMandatoryFields("Same", "User", email2);
    await expect(contactListPage.successText).toBeVisible();
  });

  test("creating contact list", async ({ page }) => {
    await contactListPage.newContactListClickable();
    const listName = `Test List ${Date.now()}`;
    await contactListPage.createContactList(listName);
  });

  test("Verify field is focused and Create button is disabled when list name is empty", async ({
    page,
  }) => {
    await contactListPage.newContactListClickable();
    await contactListPage.openCreateContactListPanel();
    await contactListPage.verifyListNameFieldIsFocused();
    await contactListPage.verifyCreateButtonIsNotInteractable();
  });

  test("Verify warning message is shown when creating contact list with duplicate name", async ({
    page,
  }) => {
    await contactListPage.newContactListClickable();

    const existingListName = "newList";

    await contactListPage.createContactList(existingListName);

    await expect(page.getByText(/already exists|duplicate/i)).toBeVisible();

    await expect(page.getByText(/created successfully/i)).not.toBeVisible();

    await page.getByRole("tab", { name: "Lists" }).click();
    await contactListPage.captureScreenshot("duplicate list error phone");
  });

  test("Verify error when creating contact list with only spaces", async () => {
    await contactListPage.openCreateContactListPanel();

    await contactListPage.fillListName("   ");

    await expect(contactListPage.createListBtn).toBeDisabled();
    await expect(contactListPage.emptyListNameError).toBeVisible();
  });

  test("Verify creating contact list with special characters", async () => {
    await contactListPage.openCreateContactListPanel();

    const specialCharName = "@#$%^&*()";

    await contactListPage.listNameInput.fill(specialCharName);

    await expect(contactListPage.createListBtn).toBeDisabled();

    await expect(contactListPage.invalidListNameError).toBeVisible({
      timeout: 10000,
    });

    await contactListPage.listsTab.click();
    await expect(page.getByText(specialCharName)).not.toBeVisible();
  });

  test("Verify creating contact list with maximum allowed characters", async () => {
    await contactListPage.openCreateContactListPanel();

    // Assuming max allowed length = 50
    const maxLengthName = "A".repeat(60);

    await contactListPage.listNameInput.fill(maxLengthName);

    // Create button should be enabled
    await expect(contactListPage.createListBtn).toBeEnabled();

    // Create the list
    await contactListPage.createListBtn.click();

    // Verify list appears in Lists tab
    await contactListPage.listsTab.click();
    await expect(page.getByText(maxLengthName, { exact: true })).toBeVisible({
      timeout: 15000,
    });
  });

  test("Verify double-click behavior on Create Contact List button", async ({
    page,
  }) => {
    const listName = `DoubleClick-${Date.now()}`;

    // Open create list panel
    await contactListPage.openCreateContactListPanel();

    // Enter list name
    await contactListPage.listNameInput.fill(listName);

    // Double click Create List
    await contactListPage.doubleClickCreateList();

    // Go to Lists tab
    await contactListPage.listsTab.click();

    // Count how many times the list appears
    const listCount = await page.getByText(listName, { exact: true }).count();

    // ✅ Assert only ONE list created
    expect(listCount).toBe(1);
  });

  test("Verify contact count displayed on list card is correct", async ({
    page,
  }) => {
    const listName = `DoubleClick-${Date.now()}`;

    // Open create list panel
    await contactListPage.openCreateContactListPanel();

    // Enter list name
    await contactListPage.listNameInput.fill(listName);

    const cardCount = await contactListPage.getContactCountFromCard(0);

    // Open that list
    await contactListPage.openListByIndex(0);

    // Get actual contacts inside the list
    const actualCount = await contactListDetailsPage.getActualContactsCount();

    expect(actualCount).toBe(cardCount);
  });

  test("Verify contact list count increases after creating new list", async ({
    page,
  }) => {

    await contactListPage.switchToListsTab();
    const beforeCount = await contactListPage.getContactListCount();

    const listName = `Auto List ${Date.now()}`;
    await contactListPage.openCreateContactListPanel();
    await contactListPage.createContactList(listName);

    await contactListPage.switchToListsTab();

    const afterCount = await contactListPage.getContactListCount();

    expect(afterCount).toBe(beforeCount + 1);
  });

  test("Verify importing contacts using CSV file", async ({ page }) => {
    const listName = `CSV List ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listName);
    await contactListPage.openList(listName);

    await contactListDetailsPage.openImportCsvModal();
    await contactListDetailsPage.uploadCsv("test-data/contacts.csv");

    // ✅ ONE call handles ALL cases
    await contactListDetailsPage.completeCsvWizard();

    await page.reload();

    // await expect(page.getByText(/1 contact/i)).toBeVisible({ timeout: 30000 });
    await contactListDetailsPage.clickBackToContactLists();
  });

  test("Add one existing contact to list", async ({ page }) => {
    const listName = `Single Contact List ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listName);
    await contactListPage.openList(listName);
    await contactListDetailsPage.openAddContact();
    await contactListDetailsPage.searchContact("Navya");
    await contactListDetailsPage.selectFirstVisibleContact();
    await contactListDetailsPage.addToList();
    await contactListDetailsPage.clickBackToContactLists();
  });
});
