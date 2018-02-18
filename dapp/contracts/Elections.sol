pragma solidity >=0.4.19;

contract Elections {
  struct Candidate {
    address key;
    string name;
    uint256 numVotes;
  }

  struct ElectionStruct {
    bytes32 id;
    Candidate[] candidates;
  }
  mapping(bytes32 => ElectionStruct) elections;
  ElectionStruct[] electionList;

  function createElection(bytes32 election) public {
    elections[election].id = election;
    electionList.push(elections[election]);
  }

  function getNumElections() public view returns (uint256) {
    return electionList.length;
  }

  function getElection(uint256 index) public view returns (bytes32 id, uint256 numCandidates) {
    ElectionStruct memory e = electionList[index];
    return (e.id, e.candidates.length);
  }

  function addCandidate(bytes32 election, address key, string name) public {
    Candidate memory candidate = Candidate(key, name, 0);
    elections[election].candidates.push(candidate);
  }

  function getNumCandidates(bytes32 election) public view returns (uint256) {
    return elections[election].candidates.length;
  }

  function getCandidate(bytes32 election, uint256 index) public view returns (address key, string name) {
    Candidate memory candidate = elections[election].candidates[index];
    return (candidate.key, candidate.name);
  }

  function getVotes(bytes32 election, uint256 candidateIndex) public view returns (uint256) {
    return elections[election].candidates[candidateIndex].numVotes;
  }

  function vote(bytes32 election, uint256 candidateIndex) public {
    elections[election].candidates[candidateIndex].numVotes++;
  }
}
