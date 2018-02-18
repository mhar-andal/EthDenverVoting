import React from "react";
import "./Voting.css";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
import PropTypes from "prop-types";
import { map } from "bluebird";

class Voting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      currentlySelected: null,
      electionName: this.props.match.params.electionName
    };
  }

  componentWillMount() {
    this.refreshCandidates()
  }

  refreshCandidates = async () => {
    const { electionName } = this.state
    const numCandidates = await this.context.elections.getNumCandidates(electionName)
    const candidateIndexes = []
    for(let i=0; i<numCandidates; ++i)
      candidateIndexes.push(i)
    this.setState({
      candidates: await map(candidateIndexes, i =>
        this.context.elections.getCandidateByIndex(electionName, i)
      )
    });
  }

  handleSubmit = proxySomething => {
    const candidateIndex = this.state.currentlySelected
    if (typeof candidateIndex !== 'number') return
    const { electionName } = this.state
    this.context.elections.vote(electionName, candidateIndex)
      .then(() => this.refreshCandidates())
  };

  renderTableRow = (id, {address, name, numVotes}, party) => {
    return (
      <TableRow key={id} selected={this.state.currentlySelected === id - 1}>
        <TableRowColumn>{id}</TableRowColumn>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{party}</TableRowColumn>
        <TableRowColumn>{numVotes}</TableRowColumn>
      </TableRow>
    );
  };

  render() {
    return (
      <div className="container">
        Election Title: {this.state.electionName}
        <Table
          onCellClick={thing => {
            this.setState({ currentlySelected: thing });
          }}
          selectable={true}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Candidate Name</TableHeaderColumn>
              <TableHeaderColumn>Party</TableHeaderColumn>
              <TableHeaderColumn>Number of Votes</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.state.candidates.map((candidate, index) => {
              return this.renderTableRow(
                index + 1,
                candidate,
                index % 2 ? "Republican" : "Democrat"
              );
            })}
          </TableBody>
        </Table>
        <FlatButton
          labelStyle={{
            color: "white"
          }}
          hoverColor="#b70b2a"
          backgroundColor="rgb(0, 40, 104)"
          label="Vote!"
          fullWidth={true}
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}

Voting.contextTypes = {
  elections: PropTypes.object
};

export default Voting;
