pragma solidity >=0.4.19;

// import "./voters.sol";
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