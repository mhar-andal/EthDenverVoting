pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "../contracts/ElectionRegistry.sol";

contract TestElectionRegistry {
  function testConstructorSetsInitialNames() public {
    ElectionRegistry registry = new ElectionRegistry();

    Assert.equal(this, registry.getOwner(), 'this test should be the owner');
  }
}
