import { $ } from '@wdio/globals'
import Page from './page.js';
import { remote } from 'webdriverio';
import { browser } from '@wdio/globals'
import cucumberJson from 'wdio-cucumberjs-json-reporter';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    clickXaltsIcon() {
        throw new Error('Method not implemented.');
    }
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $("(//input[@id='outlined-basic'])[1]");
    }

    public get inputPassword () {
        return $("(//input[@id='outlined-basic'])[2]");
    }

    public get btnSubmit () {
        return $("//button[contains(text(),'Sign In')]");
    }

    public get getStartedBtn () {
        return $("//button[contains(text(),'Get Started')]");
    }

    public get alreadyAccSignIn () {
        return $("//button[contains(text(),'Already have an account? Click here to sign in.')]");
    }

    /**
     * User click the Get started button in the homepage
     */
    public async getStarted () {
        await this.getStartedBtn.waitForClickable();
        await this.getStartedBtn.click();
        cucumberJson.attach('INFO: Get started button clicked', 'text/plain');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.alreadyAccSignIn.waitForClickable();
        await this.alreadyAccSignIn.click();
        await this.inputUsername.setValue(username);
        cucumberJson.attach('INFO: Entered username : '+username, 'text/plain');
        await this.inputPassword.setValue(password);
        cucumberJson.attach('INFO: Entered password : ******', 'text/plain');
        await this.btnSubmit.waitForClickable();
        await this.btnSubmit.click();
        cucumberJson.attach('INFO: User clicks on Signin button', 'text/plain');
        await browser.pause(5000)
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('login');
    }
}

export default new LoginPage();
