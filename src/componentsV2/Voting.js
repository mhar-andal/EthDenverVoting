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

class Voting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      candidates: ["Mhar Andal", "Josh Cheek"],
      currentlySelected: null
    };
  }

  handleSubmit = id => {
    if (!id) {
      return;
    }
    // vote
  };

  renderTableRow = (id, name, party) => {
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
            console.log("thing", thing);
            if (thing === 0 || thing === 1)
              this.setState({
                currentlySelected: thing
              });
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
                candidate,
                index === 0 ? "Republican" : "Democrat"
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

export default Voting;
