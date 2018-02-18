pragma solidity >=0.4.19;

contract ElectionRegistry {

    address registryOwner;

    address[] registeredVoters;
    mapping(address => bool) public isRegistered;

    address[] electionList;
    mapping(uint => address) public getContract;

    function ElectionRegistry() public {
      registryOwner = msg.sender;
    }

    modifier onlyRegistryOwner(){
        if (msg.sender != registryOwner) {
            revert();
        }
        _;
    }

    function newElection(bytes32 _title) onlyRegistryOwner public returns(string){
        address nElection = new Election(_title);
        if (nElection == 0x0) {
            revert();
        }
        uint id = (electionList.push(nElection) - 1);
        getContract[id] = nElection;
        return _title;
    }

    function getElectionContract(uint id) view public returns(address) {
        return (getContract[id]);
    }

    function addVoter(address _voterAddress) onlyRegistryOwner public {
        if (isRegistered[_voterAddress] == false) {
            registeredVoters.push(_voterAddress);
            isRegistered[_voterAddress] = true;
        }
    }

    function newVoter(bytes32 _name, bytes32 _dob, bytes32 _residence) onlyRegistryOwner public {
        address nVoter = new Voter(_name, _dob, _residence);
        registeredVoters.push(nVoter);
        isRegistered[nVoter] = true;
    }
}


contract Election {
    address registryAddress;
    bytes32 electionTitle;

    address[] haveVoted;
    mapping(address => bool) hasVoted;

    bytes32[]candidates;
    mapping(bytes32 => uint) numberOfVotes;
    mapping(bytes32 => bool) validCandidate;

    function Election(bytes32 _title) public {
        registryAddress = msg.sender;
        electionTitle = _title;
    }

    modifier onlyRegistry() {
        if (msg.sender != registryAddress) {
            revert();
        }
        _;
    }

    function addCandidate(bytes32 _name) onlyRegistry public {
        if (validCandidate[_name]) {
            revert();
        }
        candidates.push(_name);
        numberOfVotes[_name] = 0;
        validCandidate[_name] = true;
    }

    function vote(bytes32 _candidate) public {
        if (hasVoted[msg.sender]) {
            revert();
        }
        haveVoted.push(msg.sender);
        numberOfVotes[_candidate] += 1;
        hasVoted[msg.sender] = true;
    }
}

contract Voter {

    bytes32 name;
    bytes32 dob;
    bytes32 residence;
    address registryAddress;
    bool canVote;


    function Voter(bytes32 _name, bytes32 _dob, bytes32 _residence) public {
        name = _name;
        dob = _dob;
        residence = _residence;
        canVote = false;
        registryAddress = msg.sender;

    }

    modifier onlyRegistry(){
        if (msg.sender != registryAddress) {
            revert();
        }
        _;
    }

    function newResidence(bytes32 _newResidence) onlyRegistry public {
        residence = _newResidence;
    }

    function changeVotingStatus() onlyRegistry public {
        if (canVote) {
            canVote = false;
        }else {
            canVote = true;
        }
    }

    function checkStatus() view public returns(bool) {
        return(canVote);
    }
}
