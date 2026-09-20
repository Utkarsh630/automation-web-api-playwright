import {test, expect} from '../../src/fixtures/test-fixtures';
import {generateUser} from '../../src/utils/testData';

test.describe('Authentication', () =>{
    
    test('A1: Register with valid details', async ({page, authPage})=>{
        const user = generateUser();

        await page.goto('/');
        await authPage.signupLoginLink.click();
        await expect(page).toHaveURL(/login/);


        await authPage.startSignup(user.name, user.email);

        // Enter Account information 

        await expect(page.getByText('Enter Account Information')).toBeVisible();

        await authPage.fillAccountInformation(user);

        await authPage.verifyAccountCreated();
        await authPage.continueButton.click();
        await authPage.verifyLoggedInAs(user.name);

    })

    test('A2: Login with valid credentials', async ({page, authPage}) => {
        const user = generateUser();

        await page.goto('/');
        await authPage.signupLoginLink.click();
        await authPage.startSignup(user.name, user.email);
        await authPage.fillAccountInformation(user);
        await authPage.verifyAccountCreated();
        await authPage.continueButton.click();

        await authPage.logoutLink.click();

        // Login with valid credentials

        await authPage.login(user.email, user.password);

        // clear account
        await authPage.deleteAccountLink.click();
    })


    test('A3: Login with invalid credentials', async ({page, authPage})=>{
        const user = generateUser();

        await page.goto('/');
        await authPage.signupLoginLink.click();

        await authPage.login(user.email, user.password);
        await authPage.loginButton.click();

        await authPage.verifyInvalidLoginError();

    })

    test('A4: Logout account', async ({page, authPage})=>{
        const user = generateUser();

        await page.goto('/');
        await authPage.signupLoginLink.click();
        await authPage.startSignup(user.name, user.email);
        await authPage.fillAccountInformation(user);
        await authPage.verifyAccountCreated();
        await authPage.continueButton.click();

        await authPage.logoutLink.click();


        // login again and logout

        await authPage.login(user.email, user.password);

        await authPage.deleteAccountLink.click();
    });
})