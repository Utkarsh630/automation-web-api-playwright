import {test as base} from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { BasePage } from '../pages/BasePage';
import { NewUser, generateUser } from '../utils/testData';

type Fixtures = {
    basePage: BasePage;
    authPage: AuthPage;
    registeredUser: NewUser;
};

export const test = base.extend<Fixtures>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);   
        await use(basePage);
    },
    authPage: async ({page}, use)=>{
        const authPage = new AuthPage(page);
        await use(authPage);
    },

    registeredUser: async({page, authPage}, use)=>{
        const user = generateUser();

        await page.goto('/login', {waitUntil: 'domcontentloaded'});
        await authPage.startSignup(user.name, user.email);
        await authPage.fillAccountInformation(user);
        await authPage.verifyAccountCreated();
        await authPage.continueButton.click();
        await authPage.verifyLoggedInAs(user.name);

        await use(user);

        // cleanup
if(await authPage.loggedInAs.isVisible()){

    await authPage.deleteAccountLink.click();
    await authPage.verifyAccountDeleted();
    }else{
        await page.goto('/login', {waitUntil: 'domcontentloaded'});
        await authPage.login(user.email, user.password);
        await authPage.deleteAccountLink.click();
    }
},
});

export {expect} from '@playwright/test';
