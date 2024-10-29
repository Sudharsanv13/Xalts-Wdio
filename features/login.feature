Feature: Open Capital Network

  Scenario Outline: OnBoard OCN and Launch OCN addtion of data

    Given I am on the login page
    When User login to the page
    When User selects the Onboard OCN node card
    When User provide node details in Onboard OCN Node <nodeId1> <publicIp1> <dataType1> <nodeId2> <publicIp2> <dataType2>
    When User provide wallet details in Onboard OCN Node <walletDetail> and <transaction1> and <transaction2>
    Then User verfies the Node details and Wallet details in the preview and Submit <nodeId1> <dataType1> <publicIp1> <nodeId2> <dataType2> <publicIp2> <walletDetail> <transaction1> <transaction2>
    When User selects the Launch OCN Child Network card
    When User provide Network details in Launch OCN network child <networkName> <walletDetail>
    When User provide node details in Onboard OCN Node <nodeId1> <publicIp1> <dataType1> <nodeId2> <publicIp2> <dataType2>
    Then User verfies the Network details and Node details in the preview and Submit <networkName> <walletDetail> <nodeId1> <dataType1> <publicIp1> <nodeId2> <dataType2> <publicIp2>
    When User gets Signout from the Xalts portal

    Examples:
      | nodeId1    | publicIp1     | dataType1  | nodeId2    | publicIp2      | dataType2  | transaction1        | transaction2     | walletDetail                               | networkName         |
      | NodeID-101 | 171.95.22.190 | Validator  | NodeID-102 | 171.77.262.170 | RPC        | TRANSACTION_SUBMIT  | CONTRACT_DEPLOY  | 0x88fa61d2faA13aad8Fbd5B030372B4A159BbbDFb | NETab878            |
