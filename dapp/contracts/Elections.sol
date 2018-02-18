pragma solidity >=0.4.19;

contract Elections {
  struct ElectionStruct {
    bytes32 id;
  }
  mapping(bytes32 => ElectionStruct) elections;

  function createElection(bytes32 election) public {
    elections[election].id = election;
  }

  function getCandidates(bytes32 election) public returns (bytes32[] results) {
  }
}
