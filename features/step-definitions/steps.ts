import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'
import { browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js';
import OnboardOcnNode from '../pageobjects/onboardOcnNode.ts';
import LaunchOcnChild from '../pageobjects/launchOcnChild.ts';
import SecurePage from '../pageobjects/secure.page.js';
import { remote } from 'webdriverio';

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
    await browser.maximizeWindow();

});

When(/^User login to the page$/, async () => {
    await LoginPage.getStarted();
    await LoginPage.login("sudharsan.19971@gmail.com", "Sudhu@1997")
});

When(/^User selects the Onboard OCN node card$/, async () => {
    await LoginPage.getStarted();
    await OnboardOcnNode.onboardOcnNode();
});

When(/^User provide node details in Onboard OCN Node (.*) (.*) (.*) (.*) (.*) (.*)$/, async (nodeId1, publicIp1, dataType1, nodeId2, publicIp2, dataType2) => {
    
    await OnboardOcnNode.nodeDetails(nodeId1, publicIp1, dataType1);
    await OnboardOcnNode.nodeDetails(nodeId2, publicIp2, dataType2);
    await OnboardOcnNode.nextButton();
});

When(/^User provide wallet details in Onboard OCN Node (.*) and (.*) and (.*)$/, async (detailsText, walletPermisson1, walletPermisson2) => {
    await OnboardOcnNode.walletDetails(detailsText, walletPermisson1);
    await OnboardOcnNode.walletDetails(detailsText, walletPermisson2);
    await OnboardOcnNode.nextButton();
});

Then(/^User verfies the Node details and Wallet details in the preview and Submit (.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*)$/, async (nodeId1, dataType1, publicIp1, nodeId2, dataType2, publicIp2, walletDetail, transaction1, transaction2) => {
    await OnboardOcnNode.reviewDetailsNode(nodeId1, dataType1, publicIp1, nodeId2, dataType2, publicIp2);
    await OnboardOcnNode.walletDetailsNode(walletDetail, transaction1, transaction2);
    await OnboardOcnNode.submitButton();
});

When(/^User selects the Launch OCN Child Network card$/, async () => {
    await LaunchOcnChild.clickXaltsIcon();
    await LoginPage.getStarted();
    await LaunchOcnChild.launchOnChild();
});

When(/^User provide Network details in Launch OCN network child (.*) (.*)$/, async (networkName, walletDetail) => {
    await LaunchOcnChild.networkDetails(networkName, walletDetail);
    await OnboardOcnNode.nextButton();
});

Then(/^User verfies the Network details and Node details in the preview and Submit (.*) (.*) (.*) (.*) (.*) (.*) (.*) (.*)$/, async (networkName, walletDetail, nodeId1, dataType1, publicIp1, nodeId2, dataType2, publicIp2) => {
    await LaunchOcnChild.reviewDetailsLaunchOcn(networkName, walletDetail, nodeId1, dataType1, publicIp1, nodeId2, dataType2, publicIp2);
    await OnboardOcnNode.submitButton();
});

When(/^User gets Signout from the Xalts portal$/, async () => {
    await LaunchOcnChild.signOut();
});

