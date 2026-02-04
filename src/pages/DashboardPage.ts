import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardLink: Locator;
  readonly contactListLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardLink = page.getByRole("link", { name: "Dashboard" });
    this.contactListLink = page.getByRole("link", { name: "Contact Lists" });
  }

  async verifyDashboard() {
    await this.page.waitForURL(/dashboard/, { timeout: 20000 });
    await this.page.waitForLoadState("networkidle");
  }

  async verifyContactListsVisible() {
    await expect(this.contactListLink).toBeVisible();
  }

  async clickContactLists() {
    await Promise.all([
      this.page.waitForURL(/contact/i),
      this.contactListLink.click(),
    ]);
  }
}
