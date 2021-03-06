// @flow

import React from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { Container } from "reactstrap";
import VotingTable from "./VotingTable";
import fetchContracts from "../helpers/fetchContracts";
import Voting from "../helpers/Voting";
import ElectionRegistry from "../helpers/ElectionRegistry";
import Web3Client from "../helpers/Web3Client";
import reactLogo from "../reactLogo.svg";
import ethereumLogo from "../ethereumLogo.svg";
import UserAccounts from "./UserAccounts";
import "./App.css";
import ResultsTable from "./ResultsTable";
import Navigation from "./Tabs";
import TextField from "material-ui/TextField";
import { isEmpty } from "lodash";

class App extends React.Component {
  // setState: {
  //   votePending: boolean,
  //   votes: any,
  //   poll: any,
  // };

  constructor(props) {
    super(props);
    this.state = {
      votePending: false,
      votes: null,
      poll: null,
      accounts: null,
      creatingNewElection: false,
      electionName: "",
      voterKey: ""
    };
  }

  async componentDidMount(): any {
    const { contracts, web3 } = await fetchContracts(this.props.network, [
      "Voting",
      "ElectionRegistry"
    ]);
    // window.web3 = web3;
    const web3client = new Web3Client(web3);
    window.contracts = contracts;
    const poll = new Voting(contracts.Voting);
    const electionRegistry = new ElectionRegistry(
      contracts.ElectionRegistry,
      web3
    );
    await poll.initCandidateList();
    const votes = await poll.fetchCandidateVotes();
    this.setState({
      votes,
      poll,
      web3client,
      electionRegistry,
      accounts: web3client.getAccounts()
    });
  }

  handleElectionNameChange = value => {
    this.setState({
      electionName: value
    });
  };

  handleElectionSubmit = async () => {
    const { accounts, electionRegistry, electionName } = this.state;
    console.log("electionName", this.state.electionName);
    const electionNameResponse = await electionRegistry.newElection(
      this.state.electionName
    );
    console.log("electionNameResponse:", this.state.electionNameResponse);
    this.setState({ electionName: electionNameResponse });
  };

  voteHandler = name => async () => {
    this.setState({ votePending: true });
    const votes = await this.state.poll.voteForCandidate(
      name,
      this.state.accounts[0]
    );
    this.setState({ votes, votePending: false });
  };

  handleVoterAdd = async () => {
    const { accounts, electionRegistry, voterKey } = this.state;
    console.log("electionName", this.state.electionName);
    const voterAddResponse = await electionRegistry.addVoter(
      this.state.voterKey
    );
    console.log("voterKeyResponse:", this.state.voterAddResponse);
    this.setState({ voterKey: voterAddResponse });
  };

  render() {
    const { creatingNewElection } = this.state;
    return (
      <div>
        <AppBar title="Absentee Voting">
          <div>
            <RaisedButton
              label="New Election"
              style={{ marginTop: 6 }}
              onClick={() => {
                this.setState({
                  creatingNewElection: true,
                  newElectionFill: true
                });
              }}
            />
          </div>
        </AppBar>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360">
          <path d="M0 0H600V360H0" fill="#002868" />
          <path d="M0 360V221L120 88 300 288 480 88 600 221v139" fill="#fff" />
          <path
            d="M0 360V293L120 160 300 360 480 160 600 293v67"
            fill="#bf0a30"
          />
          <circle cx="300" cy="100" r="65" fill="#ffd700" />
        </svg> */}
        {!creatingNewElection ? (
          <Navigation
            firstName="Test"
            lastName="User"
            resultsTable={
              this.state.votes ? (
                <ResultsTable
                  candidateList={this.state.poll.candidateList}
                  votes={this.state.votes}
                  voteHandler={this.voteHandler}
                  votePending={this.state.votePending}
                />
              ) : null
            }
            votingTable={
              this.state.votes ? (
                <VotingTable
                  candidateList={this.state.poll.candidateList}
                  votes={this.state.votes}
                  voteHandler={this.voteHandler}
                  votePending={this.state.votePending}
                />
              ) : null
            }
          />
        ) : (
          <div style={{ textAlign: "center", borderColor: "#bf0a30" }}>
            <TextField
              floatingLabelFixed={true}
              floatingLabelText="Election Name"
              fullWidth={true}
              onChange={obj => this.handleElectionNameChange(obj.target.value)}
              style={{ fontSize: 30, marginTop: 14 }}
            />
            <RaisedButton
              label="Submit"
              style={{ marginTop: 6 }}
              fullWidth={true}
              backgroundColor="#bf0a30"
              onClick={this.handleElectionSubmit}
            />
          </div>
        )}
        <div>
          {!isEmpty(this.state.electionName) && (
            <h1>{this.state.electionName}</h1>
          )}
        </div>
        <div style={{ textAlign: "center", borderColor: "#bf0a30" }}>
          <TextField
            floatingLabelFixed={true}
            floatingLabelText="Voter Public Key"
            fullWidth={true}
            onChange={obj => this.handleVoterAdd(obj.target.value)}
            style={{ fontSize: 30, marginTop: 14 }}
          />
        </div>
      </div>
    );
  }
}

export default App;
