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
    this.city = page.getByRole("combobox", { name: /city/i });
    this.zipCode = page.getByPlaceholder("Enter ZIP code");
    this.notes = page.getByPlaceholder(
      "Enter any additional notes about this contact",
    );

    this.successText = page.getByText("Contact created successfully");

      this.allContactsTab = page.getByRole('radio', {
      name: 'All Contacts',
    });

    this.searchInput = page.getByPlaceholder('Search contacts...');

    this.contactCountText = page.getByText(/contacts$/i);

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

  async verifyingEmptyFields() {
    await this.firstName.fill("");
    await this.lastName.fill("");
    await this.email.fill("");
    await this.createNewContBtn.click();
    await expect(this.firstName).toBeFocused();
  }

  async verifyingCreatingContact() {
    await this.firstName.fill("fir");
    await this.lastName.fill("last");
    await this.email.fill("firlast@gmail.com");
    await this.createNewContBtn.click();
    await expect(this.successText).toBeVisible();
  }

  async createContactWithAllFields() {
    await this.firstName.fill("Navya");
    await this.lastName.fill("Dornala");
    await this.email.fill("navya.dornala@test.com");

    await this.phone.fill("9876543210");
    await this.jobTitle.fill("QA");
    await this.company.fill("Test Company");

    await this.addressLine1.fill("MG Road");
    await this.addressLine2.fill("Apartment 101");

    await this.country.selectOption("IN");
    await expect(this.state).toBeEnabled();
    await this.state.selectOption({ label: /Karnataka/i });

    await expect(this.city).toBeEnabled();
    await this.city.selectOption({ label: /Bengaluru/i });

    await this.zipCode.fill("560001");
    await this.notes.fill("Created via automation using POM");

    await this.createNewContBtn.click();
  }


   async switchToAllContacts() {
    await expect(this.allContactsTab).toBeVisible();
    await this.allContactsTab.click();
  }

  async searchContact(value: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(value);
  }

  async verifyContactPresent(identifier: string) {
    await expect(this.page.getByText(identifier)).toBeVisible();
  };


    async getContactCount(): Promise<number> {
    const text = await this.contactCountText.innerText();
    return Number(text.replace(/\D/g, ''));
  }

  async verifyContactCountIncremented(previousCount: number) {
    await expect.poll(async () => {
      return await this.getContactCount();
    }).toBe(previousCount + 1);
  }




};
