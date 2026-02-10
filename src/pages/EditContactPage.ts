import { Page, Locator, expect } from '@playwright/test';

export class EditContactPage {
  readonly page: Page;
  readonly firstNameInput:Locator;
  readonly lastNameInput:Locator;
  readonly emailInput:Locator;
  readonly phoneInput:Locator;
  readonly jobTitleInput:Locator;
  readonly companyInput:Locator;
  readonly addressLine1Input:Locator;
  readonly addressLine2Input:Locator;
  readonly saveChangesButton:Locator;
  readonly editContactTitle:Locator;


  constructor(page: Page) {
    this.page = page;
  

  // Header
  this.editContactTitle = this.page.getByText('Edit Contact');

  // Fields
  this.firstNameInput = page.getByLabel('First Name');
  this.lastNameInput = page.getByLabel('Last Name');
  this.emailInput = page.getByLabel('Email');
  this.phoneInput = page.getByLabel('Phone');
  this.jobTitleInput = page.getByLabel('Job Title');
  this.companyInput = page.getByLabel('Company');
  this.addressLine1Input = this.page.getByLabel('Address Line 1');
  this.addressLine2Input = this.page.getByLabel('Address Line 2');

  // Button
  this.saveChangesButton = this.page.getByRole('button', { name: 'Save Changes' });
  }
  async verifyEditPanelOpened() {
    await expect(this.editContactTitle).toBeVisible();
  }

  async updateName(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async updateAddress(address1: string, address2?: string) {
    await this.addressLine1Input.fill(address1);
    if (address2) {
      await this.addressLine2Input.fill(address2);
    }
  }

  async saveChanges() {
    await this.saveChangesButton.click();
  }
}
