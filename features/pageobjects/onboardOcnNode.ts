import { $ } from '@wdio/globals'
import Page from './page.js';
import { remote } from 'webdriverio';
import { browser } from '@wdio/globals'
import cucumberJson from 'wdio-cucumberjs-json-reporter';
import { expect } from 'chai'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OnboardOcnNode {
    /**
     * define selectors using getter methods
     */
    public get getStartedBtn () {
        return $("//button[contains(text(),'Get Started')]");
    }

    public get cardOnboardOcnNode () {
        return $("//h2[contains(text(),'Onboard OCN Node')]");
    }

    public get nodeId () {
        return $("(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[1]");
    }

    public get publicId () {
        return $("(//input[contains(@class,'MuiInputBase-input MuiOutlinedInput-input')])[2]");
    }

    public get nodeTypeCombo () {
        return $("//div[@id='node-type-select']");
    }

    public get nodeTypeValidator () {
        return $("//li[@data-value='Validator']");
    }

    public nodeTypeOption (value) {
        return $("//li[@data-value='"+value+"']");
    }

    public get addNode () {
        return $("//button[contains(text(),'+ Add Node ')]");
    }

    public get addWallet () {
        return $("//button[contains(text(),' + Add Wallet ')]");
    }

    public previewNodeDetails (value) {
        return $("((//div[contains(@class,'MuiDataGrid-virtualScrollerRenderZone')])[1]//div//div//div)["+value+"]");
    }

    public previewWalletDetails (value) {
        return $("((//div[contains(@class,'MuiDataGrid-virtualScrollerRenderZone')])[2]//div//div//div)["+value+"]");
    }

    public get nextbtn () {
        return $("//button[contains(text(),'Next')]");
    }

    public get submitbtn () {
        return $("//button[contains(text(),'Submit')]");
    }


    /**
     * Enters the node details
     */
    public async nodeDetails (nodeId, publicIp, dataType) {
        await this.nodeId.setValue(nodeId);
        cucumberJson.attach('INFO: Entered Node ID : '+nodeId, 'text/plain');
        await this.publicId.setValue(publicIp);
        cucumberJson.attach('INFO: Entered Public ID : '+publicIp, 'text/plain');
        await this.nodeTypeCombo.click();
        await this.nodeTypeOption(dataType).click();
        cucumberJson.attach('INFO: Selected the Node type option : '+dataType, 'text/plain');
        await this.addNode.click();
        cucumberJson.attach('INFO: Add node clicked ', 'text/plain');
    }

    /**
     * Enters clicks wallet details
     */
    public async walletDetails (detailsText, walletPermisson) {
        await this.nodeId.setValue(detailsText);
        cucumberJson.attach('INFO: Wallet details : '+detailsText, 'text/plain');
        await this.nodeTypeCombo.click();
        await this.nodeTypeOption(walletPermisson).click();
        cucumberJson.attach('INFO: Wallet permission option : '+walletPermisson, 'text/plain');
        await this.addWallet.click();
        cucumberJson.attach('INFO: Add wallet clicked ', 'text/plain');
    }

    /**
     * User verifies the Node details in Preview page
     */
    public async reviewDetailsNode (nodeId1, dataType1, publicIp1, nodeId2, dataType2, publicIp2) {
        let arr = [nodeId1, dataType1, publicIp1, nodeId2, dataType2, publicIp2];
        for(let loop=1; loop<=arr.length; loop++) {
            let tableName = await this.previewNodeDetails(loop).getText()
            await expect(tableName).to.equal(arr[loop-1]);
            cucumberJson.attach('INFO: Node details check - Actual: '+tableName+' , Expected: '+arr[loop-1]+' ', 'text/plain');
        }       
    }

    /**
     * User verifies the Wallet details in Preview page
     */
    public async walletDetailsNode (walletDetail, transaction1, transaction2) {
        let arr = [walletDetail, transaction1, walletDetail, transaction2];
        for(let loop=1; loop<=arr.length; loop++) {
            let tableName = await this.previewWalletDetails(loop).getText()
            await expect(tableName).to.equal(arr[loop-1]);
            cucumberJson.attach('INFO: Wallet details check - Actual: '+tableName+' , Expected: '+arr[loop-1]+' ', 'text/plain');
        }       
    }
    
    /**
     * Select onboard ocn node
     */
    public async onboardOcnNode () {
        await this.cardOnboardOcnNode.waitForClickable();
        await this.cardOnboardOcnNode.click();
        cucumberJson.attach('INFO: Onboard OCN Node Card clicked', 'text/plain');
    }

    /**
     * Enters clicks next button after adding all the nodes
     */
    public async nextButton () {
        await this.nextbtn.click();
        cucumberJson.attach('INFO: Next button is clicked', 'text/plain');
    }

    /**
     * Enters clicks Submit button
     */
    public async submitButton () {
        await this.submitbtn.click();
        cucumberJson.attach('INFO: Submit button is clicked', 'text/plain');
    }
}

export default new OnboardOcnNode();
