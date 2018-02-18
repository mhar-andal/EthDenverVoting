pragma solidity >=0.4.19;

contract ElectionRegistry {
    address registryOwner;

    mapping(string => address) getContract;

    function ElectionRegistry() public {
      registryOwner = msg.sender;
    }

    modifier onlyRegistryOwner(){
        if (msg.sender != registryOwner) {
            revert();
        }
        _;
    }

    function newElection(string _title) onlyRegistryOwner public returns(string) {
        address election = new Election(_title);
        if (election == 0x0) {
          revert();
        }
        getContract[_title] = election;
        return (_title);
    }

    function getElectionContract(string _title) view public returns(address) {
        return (getContract[_title]);
    }
}


contract Election {
    address registryAddress;
    string electionTitle;

    address[] haveVoted;
    mapping(address => bool) hasVoted;

    string[]candidates;
    mapping(string => uint) numberOfVotes;
    mapping(string => bool) validCandidate;

    function Election(string _title) public {
        registryAddress = msg.sender;
        electionTitle = _title;
    }

    modifier onlyRegistry() {
        if (msg.sender != registryAddress) {
            revert();
        }
        _;
    }

    function addCandidate(string _name) onlyRegistry public {
        if (validCandidate[_name]) {
            revert();
        }
        candidates.push(_name);
        numberOfVotes[_name] = 0;
        validCandidate[_name] = true;
    }

    function vote(string _candidate) public {
        if (hasVoted[msg.sender]) {
            revert();
        }
        haveVoted.push(msg.sender);
        numberOfVotes[_candidate] += 1;
        hasVoted[msg.sender] = true;
    }
}
