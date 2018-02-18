pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "../contracts/Elections.sol";

contract TestElectionThing {
  function strToBytes(string memory source) public pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) {
        return 0x0;
    }
    assembly {
        result := mload(add(source, 32))
    }
  }

  bytes32[] emptyArray;

  function testHappyPath() public {
    // bytes32 e = strToBytes("omg-test-election");
    // bytes32 c1key = strToBytes("candidate1");
    // string  memory c1name = "sally smith";
    // Elections elections = new Elections();

    // // Create
    // elections.createElection(e);
    // bytes32[] storage result = elections.getCandidates(e);
    // Assert.equal(result, emptyArray, "Elections start with no candidates");
    // Assert.equal(elections.getNames(), emptyArray, "No elections at first");
    // // FIXME: add something about the deadline

    // // Add candidates
    // elections.addCandidate(e, c1key, c1name);
    // // Assert.equal(elections.getCandidates(), [], "Elections start with no candidates")
  }
}
