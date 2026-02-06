import { Page, Locator, expect } from "@playwright/test";
import path from "path";

export class ContactListDetailsPage {
  readonly page: Page;
  readonly importCsvBtn: Locator;
  readonly importModal: Locator;
  readonly fileInput: Locator;
  readonly nextStepBtn: Locator;
  readonly importContactBtn: Locator;
  readonly addContactPanel: Locator;
  readonly addContactBtn: Locator;
  readonly addToListBtn: Locator;
  readonly searchInput: Locator;
  readonly contactResults: Locator;
  readonly backToContactListBtn: Locator;
  readonly contactRows: Locator;

  readonly uploadErrorTitle: Locator;
  readonly uploadErrorMessage: Locator;
  readonly contactCheckboxes: Locator;
  readonly uploadEmptyCsvFile: Locator;

  constructor(page: Page) {
    this.page = page;

    this.importCsvBtn = page.getByRole("button", { name: "Import" });

    this.importModal = page.getByRole("dialog", {
      name: "Import from CSV",
    });

    this.fileInput = this.importModal.locator("#csv-file-input");

    this.nextStepBtn = this.importModal.getByRole("button", {
      name: "Next step",
    });

    this.importContactBtn = this.importModal.getByRole("button", {
      name: "Import Contacts",
    });

    const addContactBtn = this.page
      .getByRole("button", { name: "Add Contact" })
      .filter({ has: this.page.getByText("Add Contacts") })
      .first();

    this.addContactPanel = page.getByRole("region", {
      name: "Add Contacts to List",
    });

    this.searchInput = page.getByPlaceholder(
      "Search contacts by name or email...",
    );

    this.contactResults = page.locator('[aria-label^="Select"]');

    this.addToListBtn = page.getByRole("button", {
      name: /Add \d+ to List/i,
    });

    this.uploadErrorTitle = page.getByText("Upload Error");
    this.uploadErrorMessage = page.getByText(
      "Invalid file type. Only CSV files are allowed.",
    );

    this.backToContactListBtn = page.getByRole("button", {
      name: "Back to Contact Lists",
    });
    this.contactCheckboxes = this.page.getByRole("checkbox");
    this.contactRows = page.locator('[role="button"][aria-disabled="false"]');

    this.uploadEmptyCsvFile = this.page.getByText(
      "CSV file has no data. Please ensure the file has a header row and at least one data row.",
      { exact: true },
    );
  }

  async openImportCsvModal() {
    await this.importCsvBtn.click();
    await expect(this.importModal).toBeVisible({ timeout: 20000 });
  }

  async uploadCsv(fileName: string) {
    const filePath = path.resolve(process.cwd(), fileName);
    await this.fileInput.setInputFiles(filePath);

    await expect(this.nextStepBtn).toBeEnabled({ timeout: 30000 });
  }

  async completeCsvWizard() {
    await Promise.race([
      this.nextStepBtn
        .waitFor({ state: "visible", timeout: 30000 })
        .catch(() => {}),
      this.importContactBtn.waitFor({ state: "visible", timeout: 30000 }),
    ]);

    while (await this.nextStepBtn.isVisible()) {
      await expect(this.nextStepBtn).toBeEnabled();
      await this.nextStepBtn.click();
    }

    await expect(this.importContactBtn).toBeEnabled({ timeout: 30000 });
    await this.importContactBtn.click();
  }

  async confirmImport() {
    await expect(this.importContactBtn).toBeVisible({ timeout: 30000 });
    await expect(this.importContactBtn).toBeEnabled({ timeout: 30000 });
    await this.importContactBtn.click();
  }
  async openAddContact() {
    // 1️⃣ Wait for contacts page to be fully ready
    await expect(
      this.page.getByRole("heading", { name: /contacts/i }),
    ).toBeVisible({ timeout: 20000 });

    const addContactBtn = this.page
      .locator("main")
      .getByRole("button", { name: "Add Contact" });

    // 2️⃣ Ensure button is interactable
    await expect(addContactBtn).toBeVisible({ timeout: 20000 });
    await expect(addContactBtn).toBeEnabled();

    // 3️⃣ Click (do NOT assume it worked)
    await addContactBtn.click();

    const searchInput = this.page.getByPlaceholder(
      "Search contacts by name or email...",
    );

    // 4️⃣ Verify panel opened — if not, retry once
    try {
      await expect(searchInput).toBeVisible({ timeout: 5000 });
    } catch {
      // React sometimes ignores first click after refresh
      await addContactBtn.click();
      await expect(searchInput).toBeVisible({ timeout: 10000 });
    }
  }
async searchContact(text: string) {
  const searchInput = this.page.getByPlaceholder(
    "Search contacts by name or email..."
  );

  await expect(searchInput).toBeVisible({ timeout: 20000 });
  await searchInput.fill(text);

  // ✅ Wait for at least ONE contact EMAIL to appear
  await expect(
    this.page.locator('a[href^="mailto:"]').first()
  ).toBeVisible({ timeout: 20000 });
}



async selectFirstVisibleContact() {
  // Ensure Add Contact panel is open
  await expect(
    this.page.getByPlaceholder("Search contacts by name or email...")
  ).toBeVisible({ timeout: 20000 });

  // ⚠️ Do NOT store the locator long-term
  const contactCards = this.page.locator('div[role="button"]');

  // Wait until at least one card exists
  await expect(contactCards.first()).toBeAttached({ timeout: 20000 });

  // 🔒 Click while EXPECTING the UI to change
  await Promise.all([
    contactCards.first().click(),
    this.addToListBtn.waitFor({ state: "enabled", timeout: 20000 }),
  ]);
}


  async addSelectedContactToList() {
    await expect(this.addToListBtn).toBeEnabled({ timeout: 20000 });
    await this.addToListBtn.click();
  }

  async selectContactByFullName(fullName: string) {
    const checkbox = this.page.getByRole("checkbox", {
      name: `Select ${fullName}`,
      exact: true,
    });

    await expect(checkbox).toBeVisible({ timeout: 20000 });
    await checkbox.check();

    await expect(this.addToListBtn).toBeEnabled({ timeout: 20000 });
  }
  async selectAllVisibleContacts() {
    const contactCards = this.page.locator(
      'div[role="button"][aria-disabled="false"]',
    );

    await expect(contactCards.first()).toBeVisible({ timeout: 20000 });

    const count = await contactCards.count();
    console.log(`Found ${count} contacts`);

    for (let i = 0; i < count; i++) {
      await contactCards.nth(i).scrollIntoViewIfNeeded();
      await contactCards.nth(i).click();
    }

    await expect(this.addToListBtn).toBeEnabled({ timeout: 20000 });
  }

  async addToList() {
    await this.addToListBtn.click();
  }

  async waitForContactCountIncrease(previousCount: number) {
    const countLabel = this.page.getByText(/contacts/i);

    await expect
      .poll(async () => {
        const text = await countLabel.textContent();
        return Number(text?.match(/\d+/)?.[0]);
      })
      .toBeGreaterThan(previousCount);
  }

  async clickBackToContactLists() {
    const backBtn = this.page.getByRole("button", {
      name: /Back to Contact Lists/i,
    });

    if ((await backBtn.count()) === 0) {
      // fallback navigation
      await this.page.goto("/contact-lists");
      return;
    }

    // await backBtn.click();

    await expect(
      this.page.getByRole("button", { name: "New Contact List" }),
    ).toBeVisible({ timeout: 15000 });
  }

  async getActualContactsCount(): Promise<number> {
    const countText = await this.page
      .getByText(/contacts$/i)
      .first()
      .textContent();

    return Number(countText?.match(/\d+/)?.[0]);
  }

  async addOneContact(searchText = "Navya") {
    await this.openAddContact();

    const searchInput = this.page.getByPlaceholder(
      "Search contacts by name or email...",
    );

    if (await searchInput.count()) {
      await searchInput.fill(searchText);
      await this.page.waitForLoadState("networkidle");
    }

    const checkboxes = this.page.getByRole("checkbox");
    await expect(checkboxes.first()).toBeVisible({ timeout: 20000 });

    // Select first contact
    await checkboxes.first().check({ force: true });

    // Now Add to List button SHOULD appear
    const addToListBtn = this.page.getByRole("button", {
      name: /Add \d+ to List/i,
    });

    await expect(addToListBtn).toBeEnabled({ timeout: 20000 });
    await addToListBtn.click();
  }

  async uploadInvalidFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  async verifyInvalidFileUploadError() {
    await expect(this.page.getByText("Upload Error")).toBeVisible({
      timeout: 15000,
    });

    await expect(
      this.page.getByText("Invalid file type. Only CSV files are allowed."),
    ).toBeVisible();
  }

  async verifyingUploadEmptyCsvFile() {
    await expect(this.uploadErrorTitle).toBeVisible({ timeout: 10000 });
    await expect(this.uploadEmptyCsvFile).toBeVisible();
  }

  async selectMultipleContacts(count: number) {
    // await expect(this.contactCheckboxes.first()).toBeVisible({
    //   timeout: 20000,
    // });

    const total = await this.contactCheckboxes.count();
    const limit = Math.min(count, total);

    for (let i = 0; i < limit; i++) {
      await this.contactCheckboxes.nth(i).check({ force: true });
    }
  }

  async verifyAddToListButtonIsNotVisible() {
    await expect(this.addToListBtn).toHaveCount(0);
  }
}
