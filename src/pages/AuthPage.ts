import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';
import { NewUser } from '../utils/testData';

export class AuthPage extends BasePage {

    constructor(page: Page){
        super(page);
    }

    // Login form 

    get loginEmailInput(): Locator{
        return this.page.locator('input[data-qa="login-email"]');
    }

    get loginPasswordInput(): Locator{
        return this.page.locator('input[data-qa="login-password"]');
    }   

    get loginButton(): Locator{
        return this.page.locator('button[data-qa="login-button"]');
    }



    // Signup section

    get signupNameInput(): Locator{

        return this.page.locator('input[data-qa="signup-name"]')
    }

    get signupEmailInput(): Locator{
        return this.page.locator('input[data-qa="signup-email"]');
    }

    get signupButton(): Locator{
        return this.page.locator('button[data-qa="signup-button"]');
    }


    // Account information form

    get titleMr(): Locator{ return this.page.locator('#id_gender1'); }
    get passwordInput(): Locator{ return this.page.locator('#password');}
    get daySelect(): Locator{ return this.page.locator('#days');}
    get monthSelect(): Locator{ return this.page.locator('#months');}
    get yearSelect(): Locator{ return this.page.locator('#years');}
    get newsletterCheckbox(): Locator{ return this.page.getByLabel('Newsletter');}
    get offersCheckbox(): Locator{ return this.page.getByLabel('Optin');}

    get firstNameInput(): Locator{ return this.page.locator('#first_name');}
    get lastNameInput(): Locator{ return this.page.locator('#last_name');}
    get companyInput(): Locator{ return this.page.locator('#company');}

    get address1Input(): Locator{ return this.page.locator('#address1');}
    get address2Input(): Locator{ return this.page.locator('#address2');}
    get countrySelect(): Locator{ return this.page.getByRole('combobox', {name: 'Country'});}
    get stateInput(): Locator{ return this.page.locator('#state');}
    get cityInput(): Locator{ return this.page.locator('#city');}
    get zipcodeInput(): Locator{ return this.page.locator('#zipcode');}
    get mobileNumberInput(): Locator{ return this.page.locator('#mobile_number');}
    
    get createAccountButton(): Locator{ 
        return this.page.getByRole('button', {name: 'Create Account'});
    }

    get loginErrorMessage(): Locator {
        return this.page.getByText('Your email or password is incorrect!');
    }


    // Confirmation messages

    get accountCreatedMessage(): Locator{
        return this.page.getByRole('heading', {name: 'Account Created!'});
    }

    get continueButton(): Locator{
        return this.page.getByRole('link', {name: 'Continue'});
    }

    get deleteAccountMessage(): Locator{
        return this.page.getByRole('heading', {name: 'Account Deleted!'});
    }

    // Actions 

    async startSignup(name: string, email: string){
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    async fillAccountInformation(user: NewUser){
        await this.titleMr.click();
        await this.passwordInput.fill(user.password);
        await this.daySelect.selectOption('1');
        await this.monthSelect.selectOption('1');
        await this.yearSelect.selectOption('2000');
        await this.newsletterCheckbox.check();
        // await this.offersCheckbox.check();
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.companyInput.fill(user.address);
        await this.address1Input.fill(user.address);
        await this.address2Input.fill(user.address);
        await this.selectCountry(user.country);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(user.zipcode);
        await this.mobileNumberInput.fill(user.mobile);

        await this.createAccountButton.click();
    }

    async login(email: string, password: string){
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyAccountCreated(){
        await expect(this.accountCreatedMessage).toBeVisible();
    }
    
    async verifyAccountDeleted(){
        await expect(this.deleteAccountMessage).toBeVisible();
    }

    async verifyLoggedInAs(username: string){
        await expect(this.loggedInAs).toContainText(username);
    }

    async verifyInvalidLoginError(){
        await expect(this.loginErrorMessage).toBeVisible();
    }

    async verifyLoggedOut(){
        await expect(this.signupLoginLink).toBeVisible();
    }


    private async selectCountry(country: string){
    
        const options = await this.countrySelect.locator('option').allTextContents();
        const match = options.find(option => option.trim().toLowerCase() === country.trim().toLowerCase());   
        if(!match){
            await this.countrySelect.selectOption({label: 'United States'});
            return;
        }

        await this.countrySelect.selectOption({label: match.trim()});
    }

}
