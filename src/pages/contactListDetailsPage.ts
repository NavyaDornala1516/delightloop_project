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

    this.addContactBtn = this.page
      .getByRole("button", { name: "Add Contact" })
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

  this.backToContactListBtn = page.getByRole("button", {
    name: "Back to Contact Lists",
  });
      this.contactRows = page.locator(
      '[role="button"][aria-disabled="false"]'
    );
  }

  async openImportCsvModal() {
    await this.importCsvBtn.click();
    await expect(this.importModal).toBeVisible({ timeout: 20000 });
  }

  async uploadCsv(fileName: string) {
    const filePath = path.resolve(process.cwd(), fileName);
    await this.fileInput.setInputFiles(filePath);

    // ✅ WAIT for CSV parsing to finish
    await expect(this.nextStepBtn).toBeEnabled({ timeout: 30000 });
  }
  async completeCsvWizard() {
    // Wait until either Next step OR Import Contacts appears
    await Promise.race([
      this.nextStepBtn
        .waitFor({ state: "visible", timeout: 30000 })
        .catch(() => {}),
      this.importContactBtn.waitFor({ state: "visible", timeout: 30000 }),
    ]);

    // If Next step exists → click through steps
    while (await this.nextStepBtn.isVisible()) {
      await expect(this.nextStepBtn).toBeEnabled();
      await this.nextStepBtn.click();
    }

    // Final import
    await expect(this.importContactBtn).toBeEnabled({ timeout: 30000 });
    await this.importContactBtn.click();
  }

  async confirmImport() {
    await expect(this.importContactBtn).toBeVisible({ timeout: 30000 });
    await expect(this.importContactBtn).toBeEnabled({ timeout: 30000 });
    await this.importContactBtn.click();
  }

  async openAddContact() {
    await expect(this.addContactBtn).toBeVisible({ timeout: 20000 });
    await expect(this.addContactBtn).toBeEnabled({ timeout: 20000 });
    await this.addContactBtn.click();

    await expect(this.searchInput).toBeVisible({ timeout: 20000 });
  }

async searchContact(text: string) {
  await expect(this.searchInput).toBeVisible({ timeout: 15000 });
  await this.searchInput.fill(text);

  // Let results update
  await this.page.waitForLoadState("networkidle");
}

async selectFirstVisibleContact() {
  // 1️⃣ Wait for search results container to appear
  const resultsContainer = this.page.locator("div.space-y-3");
  await expect(resultsContainer).toBeVisible({ timeout: 20000 });

  // 2️⃣ Wait until at least ONE checkbox exists
  const checkboxes = resultsContainer.locator('input[type="checkbox"]');

  await expect
    .poll(async () => await checkboxes.count(), {
      timeout: 20000,
    })
    .toBeGreaterThan(0);

  // 3️⃣ Click the FIRST checkbox safely
  await checkboxes.first().scrollIntoViewIfNeeded();
  await checkboxes.first().check({ force: true });

  // 4️⃣ Wait for Add to List button to enable
  await expect(this.addToListBtn).toBeEnabled({ timeout: 20000 });
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
  // All contact cards are role="button" inside the search results area
  const contactCards = this.page.locator(
    'div[role="button"][aria-disabled="false"]'
  );

  // Wait until at least one result appears
  await expect(contactCards.first()).toBeVisible({ timeout: 20000 });

  const count = await contactCards.count();
  console.log(`Found ${count} contacts`);

  for (let i = 0; i < count; i++) {
    await contactCards.nth(i).scrollIntoViewIfNeeded();
    await contactCards.nth(i).click();
  }

  // After selecting, Add to List button must be enabled
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
  await expect(this.backToContactListBtn).toBeVisible({ timeout: 15000 });
  await expect(this.backToContactListBtn).toBeEnabled();
  await this.backToContactListBtn.click();
}

  async getActualContactsCount(): Promise<number> {
    // If no contacts → list may show empty state
    const count = await this.contactRows.count();
    return count;
  }

}
