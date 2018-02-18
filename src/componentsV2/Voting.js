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
import PropTypes from 'prop-types';
import { map } from 'bluebird'

class Voting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      currentlySelected: null
    };
  }

  async componentWillMount() {
    const election = 'e1' // FIXME, get from the path, probably
    const numCandidates = await this.context.elections.getNumCandidates(election)
    const candidateIndexes = []
    for(let i=0; i<numCandidates; ++i)
      candidateIndexes.push(i)
    this.setState({
      candidates: await map(candidateIndexes, i =>
        this.context.elections.getCandidateByIndex(election, i)
      )
    })
  }

  handleSubmit = id => {
    if (!id) {
      return;
    }
    // vote
  };

  renderTableRow = (id, address, name, party) => {
    console.log(
      "this.state.currentlySelected === id - 1",
      this.state.currentlySelected === id - 1
    );
    return (
      <TableRow selected={this.state.currentlySelected === id - 1}>
        <TableRowColumn>{id}</TableRowColumn>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{party}</TableRowColumn>
      </TableRow>
    );
  };

  render() {
    console.log("state", this.state.currentlySelected);
    return (
      <div className="container">
        <Table
          onCellClick={thing => {
            this.setState({currentlySelected: thing});
          }}
          selectable={true}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Candidate Name</TableHeaderColumn>
              <TableHeaderColumn>Party</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this.state.candidates.map((candidate, index) => {
              return this.renderTableRow(
                index + 1,
                candidate.address,
                candidate.name,
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
  elections: PropTypes.object,
};

export default Voting;
