import { Page, Locator, expect } from "@playwright/test";

export class ContactListPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addContactBtn: Locator;
  readonly createNewContactText: Locator;
  readonly closeIcon: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly jobTitle: Locator;
  readonly company: Locator;
  readonly addressLine1: Locator;
  readonly addressLine2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipCode: Locator;
  readonly notes: Locator;
  readonly allContactsTab: Locator;
  readonly searchInput: Locator;
  readonly createNewContBtn: Locator;
  readonly successText: Locator;
  readonly contactCountText: Locator;
  readonly invalidEmailError: Locator;
  readonly firstNameError: Locator;
  readonly newContactListBtn: Locator;
  readonly listNameInput: Locator;
  readonly createListBtn: Locator;
  readonly listsTab: Locator;
  readonly listNameError: Locator;
  readonly emptyListNameError: Locator;
  readonly invalidListNameError: Locator;
  readonly listItemByName: (name: string) => Locator;
  readonly listCountText: Locator;
  readonly renameOption: Locator;
  readonly duplicateOption: Locator;
  readonly markInactiveOption: Locator;
  readonly duplicateRenameError: Locator;
  readonly statusDropdown: Locator;
  readonly archivedOption: Locator;
  readonly applyFiltersBtn: Locator;
  readonly duplicateListError: Locator;
  readonly validationError: Locator;
  readonly maxLengthListNameError: Locator;
  readonly invalidPhoneError: Locator;

  readonly createContactDialog: Locator;
  readonly createContactTitle: Locator;
  readonly createContactForm: Locator;

  readonly linkedinInput: Locator;
  readonly linkedinSearchBtn: Locator;
  readonly linkedinNoDetailsMsg: Locator;
  readonly linkedinProfileCard: Locator;
  readonly linkedinAutoFillBtn: Locator;

  readonly linkedinFormatError: Locator;

  readonly profilePictureInput: Locator;
  readonly profilePicturePreview: Locator;
  readonly profilePictureError: Locator;
  readonly profilePictureSubmitError: Locator;
  readonly profilePictureSizeError: Locator;
  readonly addressSuggestionItems: Locator;

  readonly companyFilter: Locator;
  readonly jobTitleFilter: Locator;
  readonly clearFiltersBtn: Locator;
  readonly noResultsText: Locator;
  readonly contactEmailCell: Locator;
  readonly addToListBtn: Locator;
  readonly contactRows: Locator;
  readonly listSearchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Contact Lists" });
    this.addContactBtn = page.getByRole("button", { name: "Add Contact" });
    this.createNewContactText = page.getByRole("heading", {
      name: "Create New Contact",
    });
    this.allContactsTab = this.page.getByRole("tab", { name: /all contacts/i });
    this.listsTab = this.page.getByRole("tab", { name: /lists/i });
    this.closeIcon = page.getByRole("button", { name: "Close" });
    this.firstName = page.getByPlaceholder("Enter first name");
    this.lastName = page.getByPlaceholder("Enter last name");
    this.email = page.getByPlaceholder("Enter email address");
    this.createNewContBtn = page.getByRole("button", {
      name: "Create New Contact",
    });

    this.phone = page.getByPlaceholder("Enter phone number");
    this.jobTitle = page.getByPlaceholder("Enter job title");
    this.company = page.getByPlaceholder("Enter company name");

    this.addressLine1 = page.getByPlaceholder("Start typing an address...");
    this.addressLine2 = page.getByPlaceholder("Apartment, suite, unit, etc.");
    this.country = page.getByRole("combobox", { name: /country/i });
    this.state = page.getByRole("combobox", { name: /state/i });
    this.city = page.getByPlaceholder("Enter city");
    this.zipCode = page.getByPlaceholder("Enter ZIP code");
    this.notes = page.getByPlaceholder(
      "Enter any additional notes about this contact",
    );

    this.successText = page.getByText("Contact created successfully");

    this.allContactsTab = page.getByRole("radio", {
      name: "All Contacts",
    });

    this.searchInput = page.getByPlaceholder("Search contacts...");

    this.contactCountText = this.page.locator("span.text-tertiary", {
      hasText: /contacts/i,
    });
    this.addToListBtn = this.page.getByRole("button", {
      name: /add \d+ to list/i,
    });

    this.invalidEmailError = page.getByText(
      /please enter a valid email address/i,
    );

    this.firstNameError = page.getByText(
      /first name can only contain letters, spaces, hyphens, and apostrophes/i,
    );
    this.listSearchInput = page.getByPlaceholder(/search lists/i);

    this.newContactListBtn = page.getByRole("button", {
      name: "New Contact List",
    });

    this.listNameInput = page.getByLabel("Enter list name");

    this.createListBtn = page.getByRole("button", {
      name: "Create List",
    });

    this.listsTab = page.getByRole("radio", {
      name: "Lists",
    });

    this.listNameError = page.getByText(
      "A list with this name already exists.",
    );

    this.emptyListNameError = page.getByText(
      "Contact list name cannot be empty or only whitespace",
    );
    this.invalidListNameError = page.getByText(
      /only letters|invalid characters|special characters/i,
    );

    this.listItemByName = (name: string) =>
      page.getByText(name, { exact: true });

    this.listCountText = page.getByText(/contact lists/i);

    this.renameOption = page.getByRole("menuitem", { name: "Rename List" });
    this.duplicateOption = page.getByRole("menuitem", {
      name: "Duplicate List",
    });
    this.markInactiveOption = page.getByRole("menuitem", {
      name: "Mark as inactive",
    });

    this.duplicateRenameError = page.getByText(
      /already exists in this organization/i,
    );

    this.duplicateListError = page.getByText(
      "A list with this name already exists.",
      { exact: true },
    );
    this.validationError = page.locator('[aria-invalid="true"]');

    this.maxLengthListNameError = page.getByText(
      "Contact list name must be less than 100 characters",
      { exact: true },
    );
    this.createContactDialog = page.getByRole("dialog");
    this.createContactTitle = page.getByRole("heading", {
      name: "Create New Contact",
    });

    this.contactRows = page
      .getByRole("row")
      .filter({ has: page.getByRole("cell") });

    this.invalidPhoneError = page.getByText(/valid phone number/i);

    this.createContactForm = page.locator("form#add-contact-form");

    this.statusDropdown = page.getByRole("button", { name: "Status" });
    this.archivedOption = this.page.getByRole("option", { name: "Archived" });
    this.applyFiltersBtn = page.getByRole("button", { name: "Apply filters" });

    this.linkedinInput = page.getByPlaceholder("Enter LinkedIn profile URL");

    this.linkedinSearchBtn = page.getByRole("button", {
      name: "Search",
    });

    this.linkedinNoDetailsMsg = page.getByText(
      "No details found for this profile. Try a full URL or another username.",
    );
    this.profilePictureSizeError = page.getByText(/size|mb|too large|exceed/i);

    this.linkedinProfileCard = page.locator("div.border-border-primary");

    this.linkedinAutoFillBtn = page.getByRole("button", {
      name: "Auto-Fill",
    });
    this.linkedinFormatError = page.getByText(
      "Enter LinkedIn URL or username (e.g., https://linkedin.com/in/username or username)",
    );
    this.profilePictureInput = page.getByPlaceholder(
      "Enter profile picture URL or upload an image",
    );

    this.profilePicturePreview = page.locator("img");

    this.profilePictureError = page.getByText(
      /invalid|unsupported|image format|profile picture/i,
    );
    this.profilePictureSubmitError = page.getByText(
      /profile picture|image|unsupported|invalid/i,
    );

    this.addressSuggestionItems = page.locator(
      'div.absolute.z-50 button[type="button"]',
    );

    // Filter fields
    this.companyFilter = page.getByLabel(/company/i);
    this.jobTitleFilter = page.getByLabel(/job title/i);

    // Clear filters
    this.clearFiltersBtn = page.getByRole("button", { name: /clear filters/i });

    // No results text
    this.noResultsText = page.getByText(/no contacts found/i);

    // Contact email cell
    this.contactEmailCell = (email: string) =>
      page.getByText(email, { exact: false });
  }

  async captureScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: false,
    });
  }
  async enterInvalidProfilePictureUrl(url: string) {
    await expect(this.profilePictureInput).toBeVisible();
    await this.profilePictureInput.fill(url);
  }
  async verifyProfilePictureRejected() {
    await expect(this.profilePictureError.first()).toBeVisible();
    await expect(this.page.locator("img")).toHaveCount(0);
  }
  async verifyProfilePictureErrorAfterSubmit() {
    await expect(this.profilePictureSubmitError.first()).toBeVisible({
      timeout: 10000,
    });

    await expect(this.createContactDialog).toBeVisible();
  }

  async enterManualAddress(data: {
    addressLine1: string;
    addressLine2?: string;
  }) {
    await expect(this.addressLine1).toBeVisible();
    await this.addressLine1.fill(data.addressLine1);

    if (data.addressLine2) {
      await this.addressLine2.fill(data.addressLine2);
    }
  }

  async enterCityAndZip(city: string, zip: string) {
    await expect(this.city).toBeVisible();
    await this.city.fill(city);

    await expect(this.zipCode).toBeVisible();
    await this.zipCode.fill(zip);
  }
  async enterNotes(notes: string) {
    await expect(this.notes).toBeVisible();
    await this.notes.fill(notes);
  }
  async verifyManualAddressValues(data: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    zip: string;
  }) {
    await expect(this.addressLine1).toHaveValue(data.addressLine1);

    if (data.addressLine2) {
      await expect(this.addressLine2).toHaveValue(data.addressLine2);
    }

    await expect(this.city).toHaveValue(data.city);
    await expect(this.zipCode).toHaveValue(data.zip);
  }

  async selectAddressSuggestionUsingKeyboard() {
    await this.page.waitForSelector("div.absolute.z-50", {
      state: "visible",
      timeout: 15000,
    });

    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
  }

  async verifyCreateContactPanelIsOpened() {
    await expect(this.createContactDialog).toBeVisible();
    await expect(this.createContactTitle).toBeVisible();
    await expect(this.createContactForm).toBeVisible();
    await expect(this.closeIcon).toBeVisible();
  }
  async addOneContact(searchText = "Navya") {
    await this.addContactBtn.click();

    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
    await this.searchInput.fill(searchText);

    const checkboxes = this.page.getByRole("checkbox");
    await expect(checkboxes.first()).toBeVisible({ timeout: 15000 });

    await checkboxes.first().check({ force: true });

    await expect(this.addToListBtn).toBeEnabled({ timeout: 10000 });
    await this.addToListBtn.click();

    await expect(this.addToListBtn).toBeDisabled({ timeout: 10000 });
  }

  async verifyContactListPage() {
    await expect(this.heading).toBeVisible();
  }

  async verifyingAddContactBtn() {
    await expect(this.addContactBtn).toBeVisible();
  }

  async verifyProfilePictureSizeLimitError() {
    await expect(this.profilePictureSizeError.first()).toBeVisible({
      timeout: 10000,
    });

    await expect(this.createContactDialog).toBeVisible();
  }

  async verifyAddressFieldsPopulated() {
    await expect(this.addressLine1).not.toHaveValue("");

    await expect(this.city).not.toHaveValue("");

    await expect(this.state).toHaveValue(/.+/);
    await expect(this.country).toHaveValue(/.+/);

    if (await this.zipCode.isVisible()) {
      await expect(this.zipCode).not.toHaveValue("");
    }
  }

  async verifyingAddContactBtnClickable() {
    await this.addContactBtn.click();
    await expect(this.createNewContactText).toBeVisible();
  }

  async verifyCountryNotAutoSelected() {
    await expect(this.country).toHaveValue("");
  }

  async verifyAddContactModalOpened() {
    await this.addContactBtn.click();
    await expect(this.createNewContactText).toBeVisible();
  }

  async closeCreateContactPanel() {
    await this.closeIcon.click();
  }

  async verifyCreateContactPanelIsClosed() {
    await expect(this.createContactDialog).toBeHidden();
  }

  async verifyingCloseIcon() {
    await expect(this.closeIcon).toBeVisible();
    await this.closeIcon.click();
    await expect(this.createNewContactText).not.toBeVisible();
  }

  async fillMandatoryFields(data: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) {
    if (data.firstName !== undefined) {
      await this.firstName.fill(data.firstName);
    }

    if (data.lastName !== undefined) {
      await this.lastName.fill(data.lastName);
    }

    if (data.email !== undefined) {
      await this.email.fill(data.email);
    }
  }

  async switchToAllContactsTab() {
    await this.allContactsTab.click();
    await expect(this.contactRows.first()).toBeVisible({ timeout: 10000 });
  }
  async verifyTrimmedValues(expected: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    await expect(this.firstName).toHaveValue(expected.firstName);
    await expect(this.lastName).toHaveValue(expected.lastName);
    await expect(this.email).toHaveValue(expected.email);
  }
  async verifyPhoneValidationErrorShown() {
    await expect(this.invalidPhoneError).toBeVisible();
    await expect(this.createContactDialog).toBeVisible();
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.phone.fill(data.phone);
  }
  async fillFormWithSpaces(data: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    await this.firstName.fill(`   ${data.firstName}   `);
    await this.lastName.fill(`   ${data.lastName}   `);
    await this.email.fill(`   ${data.email}   `);
  }

  async verifyDuplicateEmailErrorShown() {
    await expect(this.validationError).toBeVisible();
    await expect(this.createContactDialog).toBeVisible();
  }

  async creatingContactWithExistingEmailID(email: string) {
    await this.email.fill(email);
    await this.createNewContBtn.click();
  }

  async verifyNoEmailValidationError() {
    await expect(this.invalidEmailError).toHaveCount(0);
  }
  async verifyContactCreated() {
    await expect(this.createContactDialog).toBeHidden();
  }

  async verifyingCreatingContact(
    firstName: string,
    lastName: string,
    email: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.createNewContBtn.click();
  }

  async createContactWithAllFields(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    jobTitle: string;
    company: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    notes: string;
  }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);

    await this.jobTitle.fill(data.jobTitle);
    await this.company.fill(data.company);

    await this.addressLine1.fill("MG Road");
    await this.addressLine2.fill("Apartment 101");

    await this.country.selectOption(data.country);

    await expect(
      this.state.locator(`option[value="${data.state}"]`),
    ).toBeAttached();
    await this.state.selectOption(data.state);

    await this.city.click();
    await this.city.pressSequentially(data.city, { delay: 100 });

    await this.zipCode.fill(data.zipCode);
    await this.notes.fill(data.notes);

    await this.createNewContBtn.click();
  }

  async fillContactForm(firstName: string, lastName: string, email?: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);

    if (email !== undefined) {
      await this.email.fill(email);
    }
  }

  async enterProfilePictureUrl(url: string) {
    await expect(this.profilePictureInput).toBeVisible();
    await this.profilePictureInput.fill(url);
  }

  async verifyNoProfilePictureError() {
    await expect(this.page.getByText(/invalid|unsupported|error/i)).toHaveCount(
      0,
    );
  }
  async verifyProfilePictureLoaded() {
    await expect(this.profilePicturePreview.first()).toHaveAttribute(
      "src",
      /https?:\/\//,
    );
  }

  async searchContact(name: string) {
    const searchInput = this.page.getByPlaceholder("Search contacts...");

    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill(name);

    await this.page.waitForTimeout(800); // debounce
  }

  async verifySearchResultVisible(searchValue: string) {
    const rows = this.page.getByRole("row", {
      name: new RegExp(searchValue, "i"),
    });

    await expect(rows.first()).toBeVisible();
  }

  async verifySearchResults(searchValue: string) {
    const count = await this.contactCountText.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(this.contactCountText.nth(i)).toContainText(
        new RegExp(searchValue, "i"),
      );
    }
  }

  async verifyContactCountIncremented(previousCount: number) {
    await expect
      .poll(
        async () => {
          const count = await this.getContactCount();
          console.log("Current contact count:", count);
          return count;
        },
        { timeout: 15000 },
      )
      .toBe(previousCount + 1);
  }

  async selectFirstVisibleContact() {
    const rows = this.page.getByRole("row");

    await expect(rows.first()).toBeVisible({
      timeout: 20000,
    });

    await rows.first().click();

    await expect(this.addToListBtn).toBeEnabled({
      timeout: 20000,
    });
  }

  async verifyContactVisible(identifier: string) {
    await expect(this.page.getByText(identifier)).toBeVisible();
  }

  async submitInvalidPhone(phone: string) {
    await this.phone.fill(phone);
    await this.createNewContBtn.click();
  }

  async verifyInvalidPhoneHandled() {
    await expect(this.invalidPhoneError).toBeVisible();
  }

  async submitWithOnlySpaces() {
    await this.firstName.fill("   ");
    await this.lastName.fill("   ");
    await this.email.fill("    ");

    await this.createNewContBtn.click();
  }

  listCard(listName: string) {
    return this.page.locator("div.rounded-xl").filter({
      has: this.page.getByRole("heading", {
        name: listName,
        exact: true,
      }),
    });
  }

  async verifySpacesValidation() {
    await expect(this.firstNameError).toBeVisible();
  }

  async newContactListClickable() {
    // 1️⃣ Wait for page to settle
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");

    // 2️⃣ Ensure we are on LISTS tab (CRITICAL)
    const listsTab = this.page.getByRole("radio", { name: "Lists" });

    if (!(await listsTab.getAttribute("aria-checked"))) {
      await listsTab.click();
    }

    // 3️⃣ Re-query button AFTER switching tab
    const newContactListBtn = this.page.getByRole("button", {
      name: "New Contact List",
    });

    // 4️⃣ Wait for button to appear
    await expect(newContactListBtn).toBeVisible({ timeout: 30000 });
    await expect(newContactListBtn).toBeEnabled({ timeout: 30000 });

    // 5️⃣ Click
    await newContactListBtn.click();

    // 6️⃣ Confirm panel opened
    await expect(this.page.getByLabel("Enter list name")).toBeVisible({
      timeout: 30000,
    });
  }

  async verifyTabOrder() {
    await this.firstName.press("Tab");
    await expect(this.lastName).toBeFocused();

    await this.lastName.press("Tab");
    await expect(this.email).toBeFocused();
  }

  async createContactList(listName: string) {
    await this.listNameInput.fill(listName);
    await expect(this.createListBtn).toBeEnabled();
    await this.createListBtn.click();
  }

  async clickOutsideCreateContactPanel() {
    await this.page.mouse.click(10, 10);
  }

  async verifyCreateContactPanelClosed() {
    await expect(this.createContactDialog).toBeHidden();
  }

  async verifyLinkedInInvalidFormatError() {
    await expect(this.linkedinFormatError).toBeVisible();
  }
  async verifyLinkedInAutoFillNotAvailable() {
    await expect(this.linkedinAutoFillBtn).toHaveCount(0);
  }

  async verifyLinkedInSearchBlocked() {
    await expect(this.createContactDialog).toBeVisible();

    await expect(this.linkedinAutoFillBtn).toHaveCount(0);
  }
  async verifyLinkedInInlineErrorVisible() {
    await expect(
      this.page.getByText(
        "No details found for this profile. Try a full URL or another username.",
      ),
    ).toBeVisible();
  }

  async verifyLinkedInProfileNotFetched() {
    await expect(this.page.getByText("Auto-Fill")).toHaveCount(0);
  }

  async verifyCreateButtonDisabled() {
    await expect(this.createNewContBtn).toBeDisabled();
  }
  async verifyCreateButtonEnabled() {
    await expect(this.createNewContBtn).toBeEnabled();
  }
  async openCreateContactPanel() {
    await this.addContactBtn.click();
    await expect(this.createContactDialog).toBeVisible();
  }
  async openCreateContactListPanel() {
    await this.ensureListsTabIsActive();

    const btn = this.page.getByRole("button", { name: "New Contact List" });
    await expect(btn).toBeVisible({ timeout: 20000 });
    await expect(btn).toBeEnabled();

    await btn.click();

    await expect(this.listNameInput).toBeVisible({ timeout: 20000 });
  }

  async waitForContactCreation() {
    await Promise.race([
      this.createNewContactText
        .waitFor({ state: "hidden", timeout: 15000 })
        .catch(() => {}),
      this.page.waitForLoadState("networkidle"),
    ]);
  }
  async pressTab() {
    await this.page.keyboard.press("Tab");
  }

  async submitFormUsingKeyboard(
    firstName: string,
    lastName: string,
    email: string,
  ) {
    // Move focus until First Name is reached
    await this.firstName.focus();

    // Type using keyboard
    await this.page.keyboard.type(firstName);
    await this.page.keyboard.press("Tab");

    await this.page.keyboard.type(lastName);
    await this.page.keyboard.press("Tab");

    await this.page.keyboard.type(email);

    // Press Enter to submit
    await this.page.keyboard.press("Enter");
  }

  async verifyFormSubmitted() {
    // Form submission attempted
    await expect(this.createContactDialog).toBeVisible();
  }

  async verifyListNameFieldIsFocused() {
    await expect(this.listNameInput).toBeFocused();
  }

  async verifyCreateButtonIsNotInteractable() {
    await expect(this.createListBtn).toBeDisabled();
  }

  async ensureContactsExist(count = 3) {
    await this.page.goto("/contact-lists");
    await this.allContactsTab.click();

    const firstNames = ["Alpha", "Bravo", "Charlie", "Delta", "Echo"];
    const lastName = "Test";

    for (let i = 0; i < count; i++) {
      await expect(this.addContactBtn).toBeVisible({ timeout: 15000 });
      await this.addContactBtn.click();

      await expect(this.firstName).toBeVisible({ timeout: 15000 });

      await this.firstName.fill(firstNames[i]);
      await this.lastName.fill(lastName);

      // Email can have timestamp (allowed)
      await this.email.fill(`autouser${Date.now()}@test.com`);

      await this.createNewContBtn.click();

      // Confirm success
      await expect(this.successText).toBeVisible({ timeout: 15000 });
      await this.page.waitForLoadState("networkidle");
    }
  }

  async submitForm() {
    await this.createNewContBtn.click();
  }

  async openList(listName: string) {
    await this.listsTab.click();
    await expect(this.page.getByText(listName, { exact: true })).toBeVisible();
    await this.page.getByText(listName, { exact: true }).click();
  }

  async verifyListNameError() {
    await expect(this.listNameError).toBeVisible({ timeout: 10000 });
  }

  async submitWhitespaceListName() {
    await this.listNameInput.fill("   ");
    await expect(this.createListBtn).toBeDisabled();
  }

  async verifyEmptyListNameError() {
    await expect(this.emptyListNameError).toBeVisible({ timeout: 10000 });
  }

  async fillListName(value: string) {
    await this.listNameInput.fill(value);
  }

  async clickCreateList() {
    await expect(this.createListBtn).toBeEnabled();
    await this.createListBtn.click();
  }

  async generateString(length: number): string {
    return "A".repeat(length);
  }

  async getListCountByName(name: string): Promise<number> {
    return await this.page.getByText(name, { exact: true }).count();
  }
  async doubleClickCreateList() {
    await expect(this.createListBtn).toBeVisible({ timeout: 10000 });
    await expect(this.createListBtn).toBeEnabled();

    await this.createListBtn.dblclick();
  }

  async verifyValidationErrorDisplayed() {
    await expect(this.validationError.first()).toBeVisible();
  }

  async verifyFormDataRetained(firstName: string, lastName: string) {
    await expect(this.firstName).toHaveValue(firstName);
    await expect(this.lastName).toHaveValue(lastName);
  }

  async switchToListsTab() {
    await this.listsTab.click();
  }

  async verifyListVisible(listName: string) {
    await expect(this.listCard(listName)).toBeVisible();
  }

  async verifyListNotVisible(listName: string) {
    await expect(this.listCard(listName)).toHaveCount(0);
  }

  async getContactListCount(): Promise<number> {
    const countLabel = this.page.getByText(/contact lists/i).first();

    await expect(countLabel).toBeVisible({ timeout: 15000 });

    const text = await countLabel.textContent();
    return Number(text?.match(/\d+/)?.[0]);
  }

  async openListByIndex(index: number) {
    await this.page.locator("div.rounded-xl").nth(index).click();
  }

  async listCardByName(listName: string) {
    return this.page.locator("div.rounded-xl").filter({
      has: this.page.getByRole("heading", {
        name: listName,
        exact: true,
      }),
    });
  }

  async waitForListToAppear(listName: string) {
    const card = this.listCard(listName);
    await expect(card).toBeVisible({ timeout: 30000 });
  }

  async ensureListsTabIsActive() {
    const listsTab = this.page.getByRole("radio", { name: "Lists" });

    if (!(await listsTab.getAttribute("aria-checked"))) {
      await listsTab.click();
    }

    await expect(this.page.locator("div.rounded-xl").first()).toBeVisible({
      timeout: 15000,
    });
  }
  async waitForListCards() {
    await expect(this.page.locator("div.rounded-xl").first()).toBeVisible({
      timeout: 15000,
    });
  }
  async openListMenu(listName: string) {
    const card = this.listCard(listName);

    await expect(card).toBeVisible({ timeout: 15000 });

    await card.getByRole("button", { name: "Open menu" }).click();

    const menu = this.page.getByRole("menu");
    await expect(menu).toBeVisible();

    return menu;
  }

  async renameList(oldName: string, newName: string) {
    // await this.waitForListsLoaded();

    const card = this.listCard(oldName);
    await expect(card).toBeVisible({ timeout: 15000 });

    await card.getByRole("button", { name: "Open menu" }).click();

    const renameItem = this.page.getByRole("menuitemradio", {
      name: "Rename List",
    });
    await renameItem.click();

    const input = this.page.getByRole("textbox", { name: "List Name" });
    await input.fill(newName);

    await this.page.getByRole("button", { name: /save/i }).click();
  }
  async duplicateList(listName: string) {
    const menu = await this.openListMenu(listName);

    const duplicateItem = menu.getByRole("menuitemradio", {
      name: "Duplicate List",
    });

    await expect(duplicateItem).toBeVisible();
    await duplicateItem.click();
  }

  async markListInactive(listName: string) {
    await this.waitForListToAppear(listName);

    const card = this.listCard(listName);
    await card.getByRole("button", { name: "Open menu" }).click();

    const inactiveItem = this.page.getByText("Mark as Inactive", {
      exact: true,
    });
    await expect(inactiveItem).toBeVisible();
    await inactiveItem.click();
  }

  async verifyListIsInactive(listName: string) {
    await this.switchToListsTab();

    const freshCard = this.listCard(listName);
    await expect(freshCard).toBeVisible();

    await expect(freshCard.locator("text=Inactive")).toBeVisible();
  }

  async applyInactiveFilter() {
    await this.page.getByRole("checkbox", { name: /inactive/i }).check();
  }
  async waitForListsToReload() {
    await this.page.waitForLoadState("networkidle");
    await this.page
      .locator("div.rounded-xl")
      .first()
      .waitFor({ state: "visible" });
  }
  async openStatusFilterSafely() {
    // Wait until page is alive again
    await expect(this.page.locator("body")).toBeVisible();

    // Re-query element AFTER refresh
    const statusFilter = this.page.getByText("Any status", { exact: true });

    await expect(statusFilter).toBeVisible({ timeout: 20000 });
    await expect(statusFilter).toBeEnabled();

    await statusFilter.click();
  }

  async openStatusFilter() {
    await this.page.getByText("Any status", { exact: true }).click();
  }

  async openFilterPanel() {
    await this.page.getByRole("button", { name: /filter/i }).click();
  }
  async verifyDuplicateRenameError() {
    await expect(
      this.page.getByText(/already exists in this organization/i),
    ).toBeVisible({ timeout: 10000 });
  }

  async waitAfterMarkInactive() {
    // wait for backend + UI settle
    await this.page.waitForTimeout(1500);

    // wait until any list card is visible again
    await this.page.locator("div.rounded-xl").first().waitFor({
      state: "visible",
      timeout: 20000,
    });
  }

  async verifyDuplicateListCreated(originalName: string) {
    // await this.waitForListsLoaded();

    const cards = this.page
      .locator("div.rounded-xl")
      .filter({ hasText: originalName });

    await expect(cards).toHaveCount(2, { timeout: 15000 });
  }
  async selectArchivedStatus() {
    const archivedOption = this.page.getByRole("option", { name: "Archived" });
    await archivedOption.click();
  }

  async applyFilters() {
    await this.page.getByRole("button", { name: "Apply filters" }).click();
  }

  async openStatusDropdown() {
    const statusBtn = this.page.getByRole("button", { name: "Status" });

    await expect(statusBtn).toBeVisible({ timeout: 20000 });
    await expect(statusBtn).toBeEnabled();

    await statusBtn.click();
  }

  async enterLinkedInUrl(url: string) {
    await expect(this.linkedinInput).toBeVisible();
    await this.linkedinInput.fill(url);
  }

  async clickLinkedInSearch() {
    await expect(this.linkedinSearchBtn).toBeEnabled();
    await this.linkedinSearchBtn.click();
  }

  async searchLinkedInProfile(url: string) {
    await this.enterLinkedInUrl(url);
    await this.clickLinkedInSearch();
  }

  async verifyLinkedInProfileFound() {
    await expect(this.linkedinProfileCard).toBeVisible({
      timeout: 15000,
    });

    await expect(this.linkedinAutoFillBtn).toBeVisible();
    await expect(this.linkedinAutoFillBtn).toBeEnabled();
  }

  async verifyLinkedInNoDetailsFound() {
    await expect(this.linkedinNoDetailsMsg).toBeVisible();
  }

  async clickLinkedInAutoFill() {
    await expect(this.linkedinAutoFillBtn).toBeEnabled();
    await this.linkedinAutoFillBtn.click();
  }

  async typeAddress(value: string) {
    await expect(this.addressLine1).toBeVisible();
    await this.addressLine1.click();
    await this.addressLine1.pressSequentially(value, { delay: 100 });
  }

  async verifyAddressSuggestionsVisible() {
    await expect(this.addressSuggestionItems.first()).toBeVisible({
      timeout: 15000,
    });
  }

  async selectFirstAddressSuggestion() {
    await this.addressSuggestionItems.first().click();
  }

  async verifyAddressAutoFilled() {
    await expect(this.addressLine1).not.toHaveValue("");
  }

  async openFilters() {
    const filtersBtn = this.page.getByRole("button", {
      name: /^Filters$/i,
    });

    await expect(filtersBtn).toBeVisible({ timeout: 10000 });
    await expect(filtersBtn).toBeEnabled();

    await filtersBtn.click();
  }

  async getContactCount(): Promise<number> {
    await expect(this.listCountText.first()).toBeVisible({ timeout: 15000 });

    const text = await this.listCountText.first().textContent();

    const match = text?.match(/\d+/);

    return match ? Number(match[0]) : 0;
  }

  // Edit button inside a specific contact row
  editButtonForContact(name: string): Locator {
    return this.contactRow(name).getByRole("button", { name: "Edit" });
  }

  // All Edit buttons
  editButtons(): Locator {
    return this.page.getByRole("button", { name: /edit contact/i });
  }

  // Click first Edit button
  async clickFirstEdit() {
    await this.editButtons().first().click();
  }
  async verifyNoSearchResults() {
    await expect.poll(async () => await this.getContactCount()).toBe(0);
  }

  async filterByCompany(company: string) {
    await this.openFilters();
    await this.companyFilter.fill(company);
    await this.applyFilters();
  }

  async filterByJobTitle(jobTitle: string) {
    await this.openFilters();
    await this.jobTitleFilter.fill(jobTitle);
    await this.applyFilters();
  }

  async clearFilters() {
    await this.openFilters();

    // Clear filter inputs if present
    if (await this.companyFilter.isVisible()) {
      await this.companyFilter.fill("");
    }

    if (await this.jobTitleFilter.isVisible()) {
      await this.jobTitleFilter.fill("");
    }

    await this.applyFilters();
  }

  async verifyEmailVisible(email: string) {
    const emails = this.page.getByText(email, { exact: false });

    await expect(emails.first()).toBeVisible();
  }

  async verifyFilteredByJobTitle(expectedJobTitle: string) {
    const jobTitleCells = this.page.locator("td", {
      hasText: new RegExp(expectedJobTitle, "i"),
    });

    await expect(jobTitleCells.first()).toBeVisible();
  }
  async getContactNames(): Promise<string[]> {
    const rows = this.page.locator("tbody tr");
    const count = await rows.count();

    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      names.push((await rows.nth(i).textContent()) || "");
    }
    return names;
  }

  async searchList(value: string) {
    await expect(this.listSearchInput).toBeVisible({ timeout: 10000 });
    await this.listSearchInput.fill(value);

    await this.page.waitForTimeout(500);
  }
}
