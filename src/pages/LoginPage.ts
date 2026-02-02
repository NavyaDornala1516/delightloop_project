import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByPlaceholder("Enter your email");
    this.password = page.locator('input[name="password"]');

    this.loginButton = page.getByRole("button", { name: "Sign in" });
  }

async goto() {
  await this.page.goto('/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await this.email.waitFor({ state: 'visible' });
}


  async login(email: string, pass: string) {
    await this.email.fill(email);
    await this.password.fill(pass);
    await this.loginButton.click();
  }
}
