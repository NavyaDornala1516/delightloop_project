import {Page, Locator, expect} from '@playwright/test';

export class ContactListPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly addContactBtn: Locator;
    readonly createNewContactEle: Locator;
    readonly closeIcon: Locator;

    constructor(page: Page){
        this.page = page;
        this.heading = page.getByRole('heading', {name: 'Contact Lists'});
        this.addContactBtn = page.getByRole('button', {name: 'Add Contact'})
        this.createNewContactEle = page.getByRole('heading', {name: 'Create New Contact'});
        this.closeIcon = page.getByRole('button', {name: 'Close'});

    }

    async verifyContactListPage(){
        await expect(this.heading).toBeVisible();
    }

    async verifyingAddContactBtn(){
        await expect(this.addContactBtn).toBeVisible();

    }

     async verifyingAddContactBtnClickable(){
        await this.addContactBtn.click();
        await expect(this.createNewContactEle).toBeVisible();
    }

    async verifyingCloseIcon(){
        await expect(this.closeIcon).toBeVisible();
        await this.closeIcon.click();
        await expect(this.createNewContactEle).not.toBeVisible();
    }


}