// @flow

import React from "react";
import { Table, Button } from "reactstrap";
import FlatButton from "material-ui/FlatButton";
import UserHeading from "../components/UserHeading";

// const votingTableProps = {
//   candidateList: {},
//   votes: { name },
//   voteHandler: () => {},
//   votePending: false,
// };

const CandidateRow = ({ name, votes, onClick }) => (
  <tr>
    <td>
      <FlatButton label={name} primary={true} onClick={onClick} />
    </td>
    <td>{votes}</td>
  </tr>
);

const ResultsTable = props => (
  <div>
    <h1> Finalize </h1>
    <Table bordered>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        {props.candidateList.map(name => (
          <CandidateRow
            key={name}
            name={name}
            votes={props.votes[name]}
            onClick={() => {}}
          />
        ))}
      </tbody>
    </Table>
  </div>
);

export default ResultsTable;
