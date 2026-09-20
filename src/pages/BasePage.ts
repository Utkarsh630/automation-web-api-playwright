import {Page, Locator} from '@playwright/test';

export class BasePage {


    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async goto(path = '/'){
        await this.page.goto(path);
    }

    async title(): Promise <string> {
        return this.page.title();
    }

    // Navigation Links 

    get signupLoginLink(): Locator{
        return this.page.getByRole('link', {name: ' Signup / Login'});
    }

    get logoutLink(): Locator{
        return this.page.getByRole('link', {name: ' Logout'});
    }

    get loggedInAs(): Locator{
        return this.page.locator('a', { hasText: 'Logged in as' });
    }

    get deleteAccountLink(): Locator{
        return this.page.getByRole('link', {name: ' Delete Account'});
    }

}