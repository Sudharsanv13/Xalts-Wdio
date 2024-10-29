import { $ } from '@wdio/globals'
import Page from './page.js';
import { remote } from 'webdriverio';
import { browser } from '@wdio/globals'
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import { expect } from 'chai'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LaunchOcnChild {
    /**
     * define selectors using getter methods
     */
    public get xaltsIcon () {
        return $("//div[@class='logo-container']//img");
    }

    public get getStartedBtn () {
        return $("//button[contains(text(),'Get Started')]");
    }

    public get cardLaunchOcnChild () {
        return $("//h2[contains(text(),'Launch OCN Child Network')]");
    }

    public get networkName () {
        return $("(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]");
    }

    public get walletAddress () {
        return $("(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[2]");
    }

    public get networkNameValue () {
        return $("(//div[text()='Network Name']//parent::div)[1]//div[2]");
    }

    public get walletDetailsValue () {
        return $("(//div[text()='Wallet Address']//parent::div)[1]//div[2]");
    }

    public get nextbtn () {
        return $("//button[contains(text(),'Next')]");
    }

    public previewNodeDetails (value) {
        return $("((//div[contains(@class,'MuiDataGrid-virtualScrollerRenderZone')])[1]//div//div//div)["+value+"]");
    }

    public get signOutBtn () {
        return $("//button[contains(text(),'Sign Out')]");
    }

    /**
     * Open the Onboard OCN Node
     */
    public async clickXaltsIcon () {
        await this.xaltsIcon.waitForClickable();
        await this.xaltsIcon.click();
        cucumberJson.attach('INFO: Xalts icon is clicked', 'text/plain');
    }

     /**
     * Open the Onboard OCN Node
     */
     public async networkDetails (networkName, walletDetail) {
        cucumberJson.attach('INFO: Launch OCN Child Network Card is clicked', 'text/plain');
        await this.networkName.setValue(networkName);
        cucumberJson.attach('INFO: Entered Network name : '+networkName, 'text/plain');
        await this.walletAddress.setValue(walletDetail);
        cucumberJson.attach('INFO: Entered Wallet address : '+walletDetail, 'text/plain');
    }

    /**
     * User verifies the Node and wallet details in Preview page
     */
    public async reviewDetailsLaunchOcn (networkName, walletDetail, nodeId1, dataType1, publicIp1, nodeId2, dataType2, publicIp2) {
        let networkText = await this.networkNameValue.getText();
        await expect(networkText).to.equal(networkName);
        cucumberJson.attach('INFO: Network name - Actual: '+networkText+' Expected: '+networkName+' ', 'text/plain');
        let walletAddress  = await this.walletDetailsValue.getText();
        await expect(walletAddress).to.equal(walletDetail);
        cucumberJson.attach('INFO: Wallet address - Actual: '+walletAddress+' Expected: '+walletDetail+' ', 'text/plain');

        let arr = [nodeId1, dataType1, publicIp1, nodeId2, dataType2, publicIp2];
        for(let loop=1; loop<=arr.length; loop++) {
            let tableName = await this.previewNodeDetails(loop).getText()
            await expect(tableName).to.equal(arr[loop-1]);
            cucumberJson.attach('INFO: Table value check - Actual: '+tableName+' Expected: '+arr[loop-1]+' ', 'text/plain');
        }   
    }

    /**
     * Open selects the Launch on child
     */
    public async launchOnChild () {
        await this.cardLaunchOcnChild.waitForClickable();
        await this.cardLaunchOcnChild.click();
        cucumberJson.attach('INFO: Launch OCN Child Network card clicked ', 'text/plain');
    }

    /**
     * Click the signout button
     */
    public async signOut () {
        await this.signOutBtn.waitForClickable();
        await this.signOutBtn.click();
        cucumberJson.attach('INFO: Signout button is clicked ', 'text/plain');
    }

    
}

export default new LaunchOcnChild();
