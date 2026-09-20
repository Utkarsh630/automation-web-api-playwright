import {test as base} from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { BasePage } from '../pages/BasePage';

type Fixtures = {
    basePage: BasePage;
    authPage: AuthPage;
};

export const test = base.extend<Fixtures>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);   
        await use(basePage);
    },
    authPage: async ({page}, use)=>{
        const authPage = new AuthPage(page);
        await use(authPage);
    }
});

export {expect} from '@playwright/test';
