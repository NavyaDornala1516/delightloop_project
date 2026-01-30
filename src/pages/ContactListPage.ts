import {Page, Locator, expect} from '@playwright/test';

export class ContactListPage {
    readonly page: Page;
    readonly heading: Locator;

    constructor(page: Page){
        this.page = page;
        this.heading = page.getByRole('heading', {name: 'Contact Lists'})
    }

    async verifyContactListPage(){
        await expect(this.heading).toBeVisible();
    }


}