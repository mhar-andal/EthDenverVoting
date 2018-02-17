// @flow

import React from 'react';
import { Container } from 'reactstrap';
import VotingTable from './VotingTable';
import fetchContracts from '../helpers/fetchContracts';
import Voting from '../helpers/Voting';
import Web3Client from '../helpers/Web3Client';
import reactLogo from '../reactLogo.svg';
import ethereumLogo from '../ethereumLogo.svg';
import UserAccounts from './UserAccounts';
import './App.css';
import ResultsTable from './ResultsTable';
import Navigation from './Tabs';

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
    };
  }

  async componentDidMount(): any {
    const { contracts, web3 } = await fetchContracts(this.props.network, ['Voting']);
    const poll = new Voting(contracts.Voting);
    const web3client = new Web3Client(web3)
    await poll.initCandidateList();
    const votes = await poll.fetchCandidateVotes();
    this.setState({
      votes,
      poll,
      web3client,
      accounts: web3client.getAccounts(),
    });
  }

  voteHandler = (name) => async () => {
    this.setState({ votePending: true });
    const votes = await this.state.poll.voteForCandidate(name);
    this.setState({ votes, votePending: false });
  };

  render() {
    console.log('props', this.state);
    return (

   <div>
          <Navigation resultsTable={ this.state.votes ? (<ResultsTable 
                  candidateList={this.state.poll.candidateList}
                    votes={this.state.votes}
                    voteHandler={this.voteHandler}
                    votePending={this.state.votePending}
                    />) : null }
                    votingTable={ this.state.votes ? (
         
                      <VotingTable
                        candidateList={this.state.poll.candidateList}
                        votes={this.state.votes}
                        voteHandler={this.voteHandler}
                        votePending={this.state.votePending}
                      />
                    ) : null}
          />
       
      </div>
    );
  }
}

export default App;
