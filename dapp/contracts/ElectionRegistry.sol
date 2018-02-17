pragma solidity >=0.4.19;

import "./Election.sol";

contract ElectionRegistry {
    address registryOwner;

    mapping(string => address) getContract;
    
    function electionRegistry() public {
      registryOwner = msg.sender;
    }
    
    modifier onlyRegistryOwner(){
        if (msg.sender != registryOwner) {
            revert();
        }
        _;
    }
    
    function newElection(string _title) onlyRegistryOwner public {
        address nElection = new Election(_title);
        if (nElection == 0x0) {
          revert();
        }
        getContract[_title] = nElection;
    }
    
    function getELectionContract(string _title) view public returns(address) {
        return (getContract[_title]);
    }
}