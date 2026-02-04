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
  readonly listCards: Locator;
  readonly listCountText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Contact Lists" });
    this.addContactBtn = page.getByRole("button", { name: "Add Contact" });
    this.createNewContactText = page.getByRole("heading", {
      name: "Create New Contact",
    });
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

    this.invalidEmailError = page.getByText(
      /please enter a valid email address/i,
    );

    this.firstNameError = page.getByText(
      /first name can only contain letters, spaces, hyphens, and apostrophes/i,
    );

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

    this.listCountText = page.getByText(/^\d+\s+contact lists$/i);

    this.listCards = page.locator(
      "div.rounded-xl.bg-primary.border.border-secondary",
    );
  }

  async captureScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: false,
    });
  }

  async verifyContactListPage() {
    await expect(this.heading).toBeVisible();
  }

  async verifyingAddContactBtn() {
    await expect(this.addContactBtn).toBeVisible();
  }

  async verifyingAddContactBtnClickable() {
    await this.addContactBtn.click();
    await expect(this.createNewContactText).toBeVisible();
  }

  async verifyAddContactModalOpened() {
    await this.addContactBtn.click();
    await expect(this.createNewContactText).toBeVisible();
  }

  async verifyingCloseIcon() {
    await expect(this.closeIcon).toBeVisible();
    await this.closeIcon.click();
    await expect(this.createNewContactText).not.toBeVisible();
  }

  async fillMandatoryFields(
    firstName?: string,
    lastName?: string,
    email?: string,
  ) {
    if (firstName !== undefined) {
      await this.firstName.fill(firstName);
    }

    if (lastName !== undefined) {
      await this.lastName.fill(lastName);
    }

    if (email !== undefined) {
      await this.email.fill(email);
    }

    await this.createNewContBtn.click();
  }

  async creatingContactWithExistingEmailID(email: string) {
    await this.email.fill(email);
    await this.createNewContBtn.click();
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
  // async createContactWithAllFields() {
  //   await this.firstName.fill("Navya");
  //   await this.lastName.fill("ddd");
  //   await this.email.fill("navyadornala@test.com");

  //   // await this.phone.click();
  //   // await this.phone.press("Control+A");
  //   // await this.phone.press("Backspace");

  //   // await this.phone.click();

  //   // await this.phone.press(process.platform === "darwin" ? "Meta+A" : "Control+A");
  //   // await this.phone.press("Backspace");
  //   // await this.phone.type("987654321", { delay: 100 });
  //   // await this.phone.type("0", { delay: 150 });
  //   // await this.phone.press("Enter");

  //   await this.jobTitle.fill("QA");
  //   await this.company.fill("Test Company");

  //   await this.addressLine1.fill("MG Road");
  //   await this.addressLine2.fill("Apartment 101");

  //   await this.country.selectOption("IN");
  //   await expect(this.state).toBeEnabled();
  //   await expect(this.state.locator('option[value="KA"]')).toBeAttached();
  //   await this.state.selectOption("KA");

  //   await this.city.click();
  //   await this.city.pressSequentially("Bengaluru", { delay: 100 });

  //   await this.zipCode.fill("560001");
  //   await this.notes.fill("Created via automation using POM");

  //   await this.createNewContBtn.click();
  //   await expect(this.createNewContactText).toBeVisible();
  // }

  //   async fillValidatedPhone(phoneNumber: string) {
  //   await this.phone.click();

  //   await this.phone.press(
  //     process.platform === "darwin" ? "Meta+A" : "Control+A"
  //   );
  //   await this.phone.press("Backspace");

  //   // force real value change
  //   await this.phone.type(phoneNumber.slice(0, -1), { delay: 100 });
  //   await this.phone.type(phoneNumber.slice(-1), { delay: 150 });

  //   await this.phone.press("Enter");
  // }

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

  async fillContactForm(
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);

    if (phone) {
      await this.phone.fill(phone);
    }

    await this.createNewContBtn.click();
  }
  async switchToAllContacts() {
    await this.allContactsTab.click();
  }

  async searchContact(value: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(value);
  }

  async verifySearchResultVisible(searchValue: string) {
    const resultsCount = await this.contactNameButtons.count();
    expect(resultsCount).toBeGreaterThan(0);

    for (let i = 0; i < resultsCount; i++) {
      await expect(this.contactNameButtons.nth(i)).toContainText(
        new RegExp(searchValue, "i"),
      );
    }
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

  async getContactCount(): Promise<number> {
    await expect(this.listCountText).toBeVisible();

    const text = await this.listCountText.textContent();
    return Number(text?.match(/\d+/)?.[0]);
  }

  async verifyContactCountIncremented(previousCount: number) {
    await expect
      .poll(async () => await this.getContactCount())
      .toBe(previousCount + 1);
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

    await expect(this.phoneInput).toBeFocused();
  }

  async submitWithOnlySpaces() {
    await this.firstName.fill("   ");
    await this.lastName.fill("   ");
    await this.email.fill("    ");

    await this.createNewContBtn.click();
  }

  async verifySpacesValidation() {
    await expect(this.firstNameError).toBeVisible();
  }

  async newContactListClickable() {
    await this.newContactListBtn.click();
  }

  async createContactList(listName: string) {
    await this.listNameInput.fill(listName);
    await expect(this.createListBtn).toBeEnabled();
    await this.createListBtn.click();
  }

  async openCreateContactListPanel() {
    await this.newContactListBtn.click();
    // await expect(this.listNameInput).toBeVisible();
  }
  async verifyListNameFieldIsFocused() {
    await expect(this.listNameInput).toBeFocused();
  }

  async verifyCreateButtonIsNotInteractable() {
    await expect(this.createListBtn).toBeDisabled();
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

    // Playwright double click
    await this.createListBtn.dblclick();
  }

  async switchToListsTab() {
    await this.listsTab.click();
  }

  async verifyListVisible(listName: string) {
    await expect(this.listItemByName(listName)).toBeVisible({
      timeout: 15000,
    });
  }

  async getContactListCount(): Promise<number> {
    await expect(this.listCountText).toBeVisible();

    const text = await this.listCountText.textContent();
    return Number(text?.match(/\d+/)?.[0]);
  }

  async openListByIndex(index = 0) {
    await this.listCards.nth(index).click();
  }
}
