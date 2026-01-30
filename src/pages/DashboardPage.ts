import {Page, Locator, expect} from '@playwright/test';

export class DashboardPage{
    readonly page: Page;
    readonly dashboardLink: Locator;
    readonly contactListLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.dashboardLink = page.getByRole('link', {name: 'Dashboard'});
        this.contactListLink = page.getByRole('link', {name: 'Contact Lists'});
    }

    async verifyDashboard(){
        await this.page.waitForURL(/dashboard/);
        await expect(this.dashboardLink).toBeVisible();
    }

    async verifyContactListsVisible(){
        await expect(this.contactListLink).toBeVisible();
    }

    async clickContactLists(){
        await this.contactListLink.click();
    }
    
}