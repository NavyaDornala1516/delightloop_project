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
  readonly maxLengthListNameError: Locator;

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

    this.maxLengthListNameError = page.getByText(
      "Contact list name must be less than 100 characters",
      { exact: true },
    );

    this.statusDropdown = page.getByRole("button", { name: "Status" });
    this.archivedOption = this.page.getByRole("option", { name: "Archived" });
    this.applyFiltersBtn = page.getByRole("button", { name: "Apply filters" });
  }

  async captureScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: false,
    });
  }
  async addOneContact(searchText = "Navya") {
    // 1️⃣ Open Add Contact panel
    await this.addContactBtn.click();

    // 2️⃣ Search for contact
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
    await this.searchInput.fill(searchText);

    // 3️⃣ Wait for at least one checkbox
    const checkboxes = this.page.getByRole("checkbox");
    await expect(checkboxes.first()).toBeVisible({ timeout: 15000 });

    // 4️⃣ Select first contact
    await checkboxes.first().check({ force: true });

    // 5️⃣ Click Add to List
    await expect(this.addToListBtn).toBeEnabled({ timeout: 10000 });
    await this.addToListBtn.click();

    // 6️⃣ Wait for add to complete (button disabled or modal closed)
    await expect(this.addToListBtn).toBeDisabled({ timeout: 10000 });
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
    await expect(this.listCountText.first()).toBeVisible({ timeout: 15000 });

    const text = await this.listCountText.first().textContent();
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

  async createContactList(listName: string) {
    await this.listNameInput.fill(listName);
    await expect(this.createListBtn).toBeEnabled();
    await this.createListBtn.click();
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
    // Modal should close OR page should update
    await Promise.race([
      this.createNewContactText
        .waitFor({ state: "hidden", timeout: 15000 })
        .catch(() => {}),
      this.page.waitForLoadState("networkidle"),
    ]);
  }

  async verifyListNameFieldIsFocused() {
    await expect(this.listNameInput).toBeFocused();
  }

  async verifyCreateButtonIsNotInteractable() {
    await expect(this.createListBtn).toBeDisabled();
  }

async ensureContactsExist(count = 3) {
  // Always create contacts from All Contacts
  await this.page.goto("/contact-lists");
  await this.allContactsTab.click();

  // Pure alphabetic names
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

  async openFilters() {
    await this.page.getByRole("button", { name: /filters/i }).click();
  }
  async getContactCountFromCard(index = 0): Promise<number> {
    const card = this.page.locator("div.rounded-xl").nth(index);

    await expect(card).toBeVisible({ timeout: 15000 });

    const countText = await card
      .getByText(/contact/i) // more reliable than tabular-nums
      .textContent();

    const match = countText?.match(/\d+/);

    return match ? Number(match[0]) : 0;
  }
}
