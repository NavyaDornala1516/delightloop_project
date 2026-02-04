import { Page, Locator, expect } from "@playwright/test";

export class ContactListDetailsPage {
  readonly page: Page;
  readonly importCsvBtn: Locator;
  readonly fileInput: Locator;
  readonly addContactBtn: Locator;
  readonly searchInput: Locator;
  readonly addToListBtn: Locator;
  readonly nextStepBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.importCsvBtn = page.getByRole("button", {
      name: "Import",
    });
    this.fileInput = page.locator('#csv-file-input');

    this.addContactBtn = page.getByRole("button", { name: "Add Contact" });
    this.searchInput = page.getByPlaceholder("Search contacts");
    this.addToListBtn = page.getByRole("button", { name: "Add to List" });
    this.nextStepBtn = page.getByRole('button', {
  name: 'Next step',
});
  }

  async verifyListDetailsPage(listName: string) {
    await expect(
      this.page.getByRole("heading", { name: listName }),
    ).toBeVisible();
  }

  async importContactsUsingCsv(csvPath: string) {
    await this.importCsvBtn.click();
    await this.fileInput.setInputFiles(csvPath);
    await this.nextStepBtn.click();
  }

  async addContactManually(contactName: string) {
    await this.addContactBtn.click();
    await this.searchInput.fill(contactName);
    await this.page.getByText(contactName, { exact: true }).click();
    await this.addToListBtn.click();
  }
}
