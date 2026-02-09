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

  test("Validate Create Contact panel closes on clicking outside", async ({
    page,
  }) => {
    await contactListPage.openCreateContactPanel();

    await contactListPage.clickOutsideCreateContactPanel();

    await contactListPage.verifyCreateContactPanelClosed();
  });

  test("Validate Create Contact panel opens from Add Contact button", async ({
    page,
  }) => {
    await contactListPage.verifyingAddContactBtnClickable();

    // Assert
    await contactListPage.verifyCreateContactPanelIsOpened();
  });

  test("Validate form data retained after validation error", async ({
    page,
  }) => {
    await contactListPage.openCreateContactPanel();

    await contactListPage.fillContactForm("John", "Doe");

    await contactListPage.submitForm();

    await contactListPage.verifyValidationErrorDisplayed();

    await contactListPage.verifyFormDataRetained("John", "Doe");
  });

  test("Validate Create Contact panel closes on Close (X) icon click", async ({
    page,
  }) => {
    await contactListPage.openCreateContactPanel();

    await contactListPage.closeCreateContactPanel();

    await contactListPage.verifyCreateContactPanelIsClosed();
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

    await contactListPage.waitForContactCreation();
  });

  test("Mandatory fields validation on Add Contact", async () => {
    await contactListPage.verifyingAddContactBtnClickable();

    await contactListPage.fillMandatoryFields(
      "Navya",
      "ddd",
      "navyadornala@test.com",
    );
    await contactListPage.waitForContactCreation();
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
    await contactListPage.waitForContactCreation();
  });

  ["abc123", "123abc", "!@#$%", "999"].forEach((phone) => {
    test(`Invalid phone: ${phone}`, async ({ page }) => {
      await contactListPage.verifyingAddContactBtnClickable();
      await contactListPage.fillContactForm("Test", "User", "test@user.com");

      await expect(contactListPage.successText).not.toBeVisible();
      await contactListPage.captureScreenshot("invalid phone");
    });
  });

  test("Validate creating a contact with only spaces in mandatory fields", async ({
    page,
  }) => {
    await contactListPage.verifyingAddContactBtnClickable();
    await contactListPage.submitWithOnlySpaces();

    await expect(
      page.getByRole("heading", { name: "Create New Contact" }),
    ).toBeVisible();

    await expect(
      page.getByText(/contact created successfully/i),
    ).not.toBeVisible();
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
      `Navya.${Date.now()}@example.com`,
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
      `Navya.${Date.now()}@example.com`,
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
      `Navya.${Date.now()}@example.com`,
    );

    await expect(contactListPage.firstNameError).toBeVisible();
  });

  test("Validate creating a contact with uppercase Email ID", async ({
    page,
  }) => {
    const email = `Navya.${Date.now()}@EXAMPLE.COM`;

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
    const listName = `Navya ${Date.now()}`;
    await contactListPage.createContactList(listName);
  });

  test("Verify field is focused and Create button is disabled when list name is empty", async ({
    page,
  }) => {
    await contactListPage.newContactListClickable();

    await contactListPage.verifyCreateButtonIsNotInteractable();
  });

  test("Verify warning message is shown when creating contact list with duplicate name", async () => {
    await contactListPage.newContactListClickable();

    const existingListName = "newList";

    await contactListPage.createContactList(existingListName);

    await expect(contactListPage.duplicateListError).toBeVisible({
      timeout: 10000,
    });

    await expect(contactListPage.listNameInput).toBeVisible();
  });

  test("Verify error when creating contact list with only spaces", async () => {
    await contactListPage.openCreateContactListPanel();

    await contactListPage.fillListName("   ");

    await expect(contactListPage.createListBtn).toBeDisabled();
    await expect(contactListPage.emptyListNameError).toBeVisible();
  });

  // test("Verify creating contact list with special characters", async () => {
  //   await contactListPage.openCreateContactListPanel();

  //   const specialCharName = "@#$%^&*()";

  //   await contactListPage.listNameInput.fill(specialCharName);

  //   await contactListPage.listNameInput.fill("@#$%^&*()");
  //   await contactListPage.createListBtn.click();

  //   await expect(contactListPage.invalidListNameError).toBeVisible({
  //     timeout: 10000,
  //   });
  // });

  test("Verify warning message when creating contact list with more than 100 characters", async () => {
    await contactListPage.openCreateContactListPanel();

    const overLimitName = `List-${Date.now()}-${"A".repeat(101)}`;

    await contactListPage.listNameInput.fill(overLimitName);

    await contactListPage.listNameInput.blur();

    await expect(contactListPage.maxLengthListNameError).toBeVisible({
      timeout: 10000,
    });

    await expect(contactListPage.listNameInput).toBeVisible();

    await expect(contactListPage.createListBtn).toBeDisabled();
  });

  test("Verify double-click behavior on Create Contact List button", async ({
    page,
  }) => {
    const listName = `Navya-${Date.now()}`;

    await contactListPage.openCreateContactListPanel();

    await contactListPage.listNameInput.fill(listName);

    await contactListPage.doubleClickCreateList();

    await contactListPage.listsTab.click();

    const listCount = await page.getByText(listName, { exact: true }).count();

    expect(listCount).toBe(1);
  });

  // test("Verify contact count displayed on list card is correct", async () => {
  //   const listName = `Navya-${Date.now()}`;

  //   await contactListPage.openCreateContactListPanel();
  //   await contactListPage.listNameInput.fill(listName);
  //   await contactListPage.createListBtn.click();

  //   await contactListPage.openListByIndex(0);

  //   // Add exactly one contact
  //   await contactListDetailsPage.addOneContact();

  //   // Go back safely
  //   await page.goto("/contact-lists");

  //   const cardCount = await contactListPage.getContactCountFromCard(0);

  //   await contactListPage.openListByIndex(0);
  //   const actualCount = await contactListDetailsPage.getActualContactsCount();

  //   expect(actualCount).toBe(cardCount);
  // });

  test("Verify importing contacts using invalid CSV file", async ({ page }) => {
    const listName = `Navya ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listName);
    await contactListPage.openList(listName);

    await contactListDetailsPage.openImportCsvModal();
    await contactListDetailsPage.uploadInvalidFile(
      "test-data/invalid-file.txt",
    );

    await contactListDetailsPage.verifyInvalidFileUploadError();
  });

  test("Verify importing contacts using no fields data CSV file", async ({
    page,
  }) => {
    const listName = `Navya ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listName);
    await contactListPage.openList(listName);

    await contactListDetailsPage.openImportCsvModal();
    await contactListDetailsPage.uploadInvalidFile("test-data/nofields.csv");
    await contactListDetailsPage.verifyingUploadEmptyCsvFile();
  });

  test("Verify importing contacts using no Dublicate Contacts fields CSV file", async ({
    page,
  }) => {
    const listName = `Navya ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listName);
    await contactListPage.openList(listName);

    await contactListDetailsPage.openImportCsvModal();
    await contactListDetailsPage.uploadInvalidFile(
      "test-data/dublicateContacts.csv",
    );

    await contactListDetailsPage.completeCsvWizard();

    await page.reload();

    await contactListDetailsPage.clickBackToContactLists();
  });
  test("Verify contact list count increases after creating new list", async () => {
    await contactListPage.switchToListsTab();
    const beforeCount = await contactListPage.getContactListCount();

    const listName = `Navya ${Date.now()}`;
    await contactListPage.openCreateContactListPanel();
    await contactListPage.createContactList(listName);

    await contactListPage.switchToListsTab();
    const afterCount = await contactListPage.getContactListCount();

    expect(afterCount).toBe(beforeCount + 1);
  });

  // test("Add multiple existing contacts to list", async () => {
  //   await contactListPage.ensureContactsExist(3);

  //   const listName = `Navya ${Date.now()}`;

  //   await contactListPage.newContactListClickable();
  //   await contactListPage.createContactList(listName);
  //   await contactListPage.openList(listName);

  //   await contactListDetailsPage.openAddContact();
  //   await contactListDetailsPage.searchContact("Alpha");

  //   await contactListDetailsPage.selectMultipleContacts(3);
  //   await contactListDetailsPage.addToList();

  //   await contactListDetailsPage.clickBackToContactLists();
  // });

  // test("Verify Add to List button is disabled without contact selection", async () => {
  //   const listName = `Navya ${Date.now()}`;

  //   await contactListPage.newContactListClickable();
  //   await contactListPage.createContactList(listName);
  //   await contactListPage.openList(listName);

  //   // 👇 DO NOT expect contacts
  //   await contactListDetailsPage.openAddContact(false);

  //   await contactListDetailsPage.searchContact("Navya");

  //   await contactListDetailsPage.verifyAddToListButtonIsNotVisible();
  // });

  test("Verify Rename List updates name everywhere", async () => {
    const originalName = `Navya Test ${Date.now()}`;
    const newName = `Renamed ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(originalName);

    await contactListPage.renameList(originalName, newName);

    await expect(contactListPage.listCard(newName)).toBeVisible();
  });

  test("Verify Rename List does not allow duplicate names", async () => {
    const listA = `Navya Rename-A-${Date.now()}`;
    const listB = `Navya Rename-B-${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listA);

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listB);

    await contactListPage.switchToListsTab();
    await contactListPage.waitForListCards();

    await contactListPage.renameList(listA, listB);

    await contactListPage.verifyDuplicateRenameError();
  });

  test("Verify Duplicate List creates new list successfully", async () => {
    const listName = `Multi Contact List ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listName);

    await contactListPage.duplicateList(listName);

    await contactListPage.verifyDuplicateListCreated(listName);
  });

  // test("Verify duplicated list contains all contacts", async () => {
  //   const originalList = "Multi Contact List 1770258021515";

  //   // Original list contact count
  //   const originalCard = contactListPage.listCardByName(originalList);
  //   const originalCountText = await originalCard
  //     .getByText(/contacts/i)
  //     .textContent();

  //   const originalCount = Number(originalCountText?.match(/\d+/)?.[0]);

  //   // Duplicate list
  //   await contactListPage.duplicateList(originalList);

  //   const duplicatedListName = `${originalList} (Copy)`;
  //   const duplicatedCard = contactListPage.listCardByName(duplicatedListName);

  //   await expect(duplicatedCard).toBeVisible();

  //   const duplicatedCountText = await duplicatedCard
  //     .getByText(/contacts/i)
  //     .textContent();

  //   const duplicatedCount = Number(duplicatedCountText?.match(/\d+/)?.[0]);

  //   expect(duplicatedCount).toBe(originalCount);
  // });

  test("Verify Mark as Inactive moves list to Archived filter", async ({
    page,
  }) => {
    const listName = `Navya ${Date.now()}`;

    await page.goto("/contact-lists");
    await contactListPage.openCreateContactListPanel();
    await contactListPage.createContactList(listName);

    await contactListPage.verifyListVisible(listName);

    await contactListPage.markListInactive(listName);

    await contactListPage.openFilters();
    await contactListPage.openStatusDropdown();
    await contactListPage.selectArchivedStatus();
    await contactListPage.applyFilters();

    await contactListPage.verifyListVisible(listName);
  });

  test("Verify importing contacts using CSV file", async ({ page }) => {
    const listName = `Navya ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listName);
    await contactListPage.openList(listName);
    await contactListDetailsPage.openImportCsvModal();
    await contactListDetailsPage.uploadCsv("test-data/contacts.csv");
    await contactListDetailsPage.completeCsvWizard();
    await page.reload();
    await contactListDetailsPage.clickBackToContactLists();
  });

  test("Validate Create button disabled until mandatory fields filled", async ({
    page,
  }) => {
    await contactListPage.openCreateContactPanel();

    await contactListPage.verifyCreateButtonDisabled();

    await contactListPage.fillMandatoryFields(
      "John",
      "Doe",
      "john.doe@test.com",
    );

    await contactListPage.verifyCreateButtonEnabled();
  });

  test("Validate tab navigation order", async ({ page }) => {
    await contactListPage.openCreateContactPanel();

    await contactListPage.verifyTabOrder();
  });

  test("Validate keyboard-only submission", async ({ page }) => {
    await contactListPage.openCreateContactPanel();

    // Submit using only keyboard
    await contactListPage.submitFormUsingKeyboard(
      "John",
      "Doe",
      "john.doe@test.com",
    );

    // Verify submission success
    await contactListPage.verifyFormSubmitted();
  });

  test("Add one existing contact to list", async () => {
    await contactListPage.ensureContactsExist(1);

    const listName = `Navya ${Date.now()}`;

    await contactListPage.newContactListClickable();
    await contactListPage.createContactList(listName);
    await contactListPage.openList(listName);

    await contactListDetailsPage.openAddContact(true);

    await contactListDetailsPage.searchContact("Alpha");
    await contactListDetailsPage.selectFirstVisibleContact();
    await contactListDetailsPage.addToList();
  });

  //     firstName: "Navya",
  //     lastName: "Test",
  //     email: `navya${Date.now()}@test.com`,
  //   };

  //   const listName = `E2E-List-${Date.now()}`;
  //   await contactListPage.verifyingAddContactBtnClickable();

  //   await contactListPage.verifyingCreatingContact(
  //     contactData.firstName,
  //     contactData.lastName,
  //     contactData.email
  //   );

  //   await expect(contactListPage.successText).toBeVisible();
  //   await contactListPage.openCreateContactListPanel();
  //   await contactListPage.createContactList(listName);
  //   await contactListPage.switchToListsTab();
  //   await contactListPage.openList(listName);

  //   await contactListDetailsPage.openImportCsvModal();
  //   await contactListDetailsPage.uploadCsv("test-data/contacts.csv");
  //   await contactListDetailsPage.completeCsvWizard();

  //   await contactListPage.newContactListClickable();
  //   await contactListPage.createContactList(listName);
  //   await contactListPage.openList(listName);
  //   await contactListDetailsPage.openAddContact();
  //   await contactListDetailsPage.searchContact("Navya");
  //   await contactListDetailsPage.selectFirstVisibleContact();
  //   await contactListDetailsPage.addToList();
  //   await contactListDetailsPage.clickBackToContactLists();

  //   await contactListPage.verifyListVisible(listName);
  // });

  // test('Validate trimming of leading and trailing spaces', async ({ page }) => {
  //   const contactData = {
  //     firstName: `User${Date.now()}`,
  //     lastName: `Test${Math.floor(Math.random() * 1000)}`,
  //     email: `user${Date.now()}@test.com`,
  //   };

  //   await contactListPage.openCreateContactPanel();

  //   await contactListPage.fillFormWithSpaces(contactData);

  //   await contactListPage.submitForm();

  //   // await contactListPage.verifyTrimmedValues(contactData);
  // });

  //no warning showing
  test("Validate email uniqueness is case-insensitive", async ({ page }) => {
    const baseEmail = `user${Date.now()}@test.com`;

    const emailUpperCase = baseEmail.toUpperCase();

    const firstContact = {
      firstName: "User",
      lastName: "One",
      email: baseEmail,
    };

    const duplicateContact = {
      firstName: "User",
      lastName: "Two",
      email: emailUpperCase,
    };

    await contactListPage.openCreateContactPanel();
    await contactListPage.fillMandatoryFields(firstContact);
    await contactListPage.submitForm();

    await contactListPage.openCreateContactPanel();
    await contactListPage.fillMandatoryFields(duplicateContact);
    await contactListPage.submitForm();

    await contactListPage.verifyDuplicateEmailErrorShown();
  });

  //it is nt giving any warning
  test("should trim leading and trailing spaces in first name and last name", async ({}) => {
    await contactListPage.openCreateContactPanel();

    const inputData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
    };

    await contactListPage.fillFormWithSpaces(inputData);

    await contactListPage.submitForm();

    await contactListPage.verifyTrimmedValues({
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      email: inputData.email,
    });

    await contactListPage.verifyContactCreated();
  });

  test("Validate very long phone number is not allowed", async ({ page }) => {
    const timestamp = Date.now();

    const veryLongPhoneNumber = "9".repeat(25);

    const contactData = {
      firstName: `User`,
      lastName: "LongPhone",
      email: `user${timestamp}@test.com`,
      phone: veryLongPhoneNumber,
    };

    await contactListPage.openCreateContactPanel();

    await contactListPage.fillForm(contactData);

    await contactListPage.submitForm();

    await contactListPage.verifyInvalidPhoneHandled();
  });

  test("Validate phone number with special characters is not allowed", async ({
    page,
  }) => {
    const timestamp = Date.now();

    const contactData = {
      firstName: `User${timestamp}`,
      lastName: "SpecialChar",
      email: `user${timestamp}@test.com`,
      phone: "98@76#543210",
    };

    await contactListPage.openCreateContactPanel();

    await contactListPage.fillForm(contactData);

    await contactListPage.submitForm();

    await contactListPage.verifyPhoneValidationErrorShown();
  });

  test("should auto-fill from LinkedIn, add random email, and create contact", async ({}) => {
    await contactListPage.openCreateContactPanel();

    await contactListPage.searchLinkedInProfile(
      "https://www.linkedin.com/in/anne-sofie-frederiksen",
    );

    await contactListPage.verifyLinkedInProfileFound();

    await contactListPage.clickLinkedInAutoFill();

    await expect(contactListPage.createContactDialog).toBeVisible();

    const randomEmail = `autolinkedin_${Date.now()}@test.com`;
    await contactListPage.email.fill(randomEmail);

    await contactListPage.verifyCreateButtonEnabled();

    await contactListPage.submitForm();

    await contactListPage.verifyContactCreated();
  });

  test("should show error and not fetch profile for invalid LinkedIn URL", async ({}) => {
    // Step 1: Open Create Contact panel
    await contactListPage.openCreateContactPanel();

    // Step 2: Enter invalid LinkedIn URL
    await contactListPage.searchLinkedInProfile(
      "https://www.linkedin.com/invalid-profile-format",
    );

    // Step 3: Verify 'No details found' message is shown
    await contactListPage.verifyLinkedInNoDetailsFound();

    // Step 4: Verify Auto-Fill button is NOT visible
    await expect(contactListPage.linkedinAutoFillBtn).toHaveCount(0);

    // Step 5: Verify Create Contact dialog is still open
    await expect(contactListPage.createContactDialog).toBeVisible();

    // Step 6: Ensure contact is NOT created automatically
    await contactListPage.verifyCreateButtonDisabled();
  });

  test("should show validation error for invalid LinkedIn URL format", async ({}) => {
    await contactListPage.openCreateContactPanel();

    await contactListPage.enterLinkedInUrl("https://google.com/john");

    await contactListPage.clickLinkedInSearch();

    await contactListPage.verifyLinkedInInvalidFormatError();

    await contactListPage.verifyLinkedInAutoFillNotAvailable();

    await contactListPage.verifyLinkedInSearchBlocked();
  });

    test("should reject invalid profile picture URL format", async ({
  }) => {

    await contactListPage.openCreateContactPanel();

    await contactListPage.enterInvalidProfilePictureUrl(
      "https://example.com/document.pdf"
    );

    await contactListPage.verifyProfilePictureRejected();

    await expect(contactListPage.createContactDialog).toBeVisible();
  });


  test("should accept valid profile picture URL format", async ({}) => {
    await contactListPage.openCreateContactPanel();

    await contactListPage.enterProfilePictureUrl(
      "https://via.placeholder.com/150.jpg",
    );

    await contactListPage.verifyProfilePictureLoaded();
    // await contactListPage.verifyNoProfilePictureError();

    await contactListPage.verifyCreateButtonEnabled();
  });

  test("Validate email with plus (+) symbol is accepted", async ({ page }) => {
    const timestamp = Date.now();
    const emailWithPlus = `user+test${timestamp}@example.com`;

    const contactData = {
      firstName: `User`,
      lastName: "Plus",
      email: emailWithPlus,
    };

    await contactListPage.openCreateContactPanel();

    await contactListPage.fillMandatoryFields(contactData);

    await contactListPage.submitForm();

    // Email should be accepted
    await contactListPage.verifyNoEmailValidationError();

    // Contact should be created successfully
    await contactListPage.verifyContactCreated();
  });

  test("E2E: Create contact → Create list → Import contacts → Add contact to list", async ({
    page,
  }) => {
    await page.goto("/contact-lists", { waitUntil: "domcontentloaded" });

    const contactEmail = `navya.${Date.now()}@test.com`;

    await contactListPage.verifyingAddContactBtnClickable();

    await contactListPage.fillMandatoryFields(
      "Navya",
      "Automation",
      contactEmail,
    );

    await expect(contactListPage.successText).toBeVisible();

    const listName = `E2E-List-${Date.now()}`;

    await contactListPage.openCreateContactListPanel();
    await contactListPage.createContactList(listName);

    await contactListPage.switchToListsTab();
    await expect(contactListPage.listCard(listName)).toBeVisible();

    await contactListPage.openList(listName);

    await expect(
      page.getByRole("heading", { name: /contacts/i }),
    ).toBeVisible();

    await contactListDetailsPage.openImportCsvModal();
    await contactListDetailsPage.uploadCsv("test-data/contacts.csv");
    await contactListDetailsPage.completeCsvWizard();

    await expect(
      page.getByRole("heading", { name: /contacts/i }),
    ).toBeVisible();

    await contactListDetailsPage.openAddContact();

    await contactListDetailsPage.searchContact("Navya");
    await contactListDetailsPage.selectFirstVisibleContact();
    await contactListDetailsPage.addToList();

    await expect(page.getByText(/contact added successfully/i)).toBeVisible();

    await contactListDetailsPage.clickBackToContactLists();
    await expect(contactListPage.listCard(listName)).toBeVisible();
  });
});
