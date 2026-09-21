import {test, expect} from '../../src/fixtures/test-fixtures';
import {generateUser} from '../../src/utils/testData';

test.describe('Authentication', () =>{
    
    test('A1: Register with valid details', async ({page, authPage})=>{
        const user = generateUser();

        await page.goto('/');
        await authPage.navigateToLoginPage();
        await expect(page).toHaveURL(/login/);


        await authPage.startSignup(user.name, user.email);
        await authPage.verifyAccountInformationPage();

        // Enter Account information 
        await authPage.fillAccountInformation(user);

        await authPage.verifyAccountCreated();
        await authPage.continueAfterAccountCreation();
        await authPage.verifyLoggedInAs(user.name);

        await authPage.deleteAccount();
        await authPage.verifyAccountDeleted();

    })

    test('A2: Login with valid credentials', async ({page, authPage, registeredUser}) => {
        

        await authPage.logout();
        await authPage.verifyLoggedOut();
        
        // Login with valid credentials

        await authPage.login(registeredUser.email, registeredUser.password);
        await authPage.verifyLoggedInAs(registeredUser.name);
    })


    test('A3: Login with invalid credentials', async ({page, authPage})=>{
        const user = generateUser();

        await page.goto('/');
        await authPage.navigateToLoginPage();
        await expect(page).toHaveURL(/login/);


        await authPage.login(user.email, user.password);
        await authPage.verifyInvalidLoginError();

    })

    test('A4: Logout account', async ({page, authPage, registeredUser})=>{
       
        await authPage.verifyLoggedInAs(registeredUser.name);
        await authPage.logout();

        await authPage.verifyLoggedOut();

    });
})