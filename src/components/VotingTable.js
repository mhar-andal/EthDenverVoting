// @flow

import React from "react";
import { Table, Button, Progress } from "reactstrap";
import FlatButton from "material-ui/FlatButton";
import UserHeading from "../components/UserHeading";

// const votingTableProps = {
//   candidateList: {},
//   votes: { name },
//   voteHandler: () => {},
//   votePending: false,
// };

const CandidateRow = ({ name, votes, votePending, onClick }) => (
  <tr>
    <td>
      <FlatButton
        label={name}
        primary={true}
        disabled={votePending}
        onClick={onClick}
      />
    </td>
    <td>{votes}</td>
  </tr>
);

const VotingTable = props => (
  <div>
    <UserHeading />
    <Table bordered>
      <thead>
        <tr>
          <th>Vote For:</th>
          <th>Votes</th>
        </tr>
        <tr>
          <th colSpan="2" style={{ padding: 0 }}>
            {props.votePending ? (
              <Progress animated value="100" color="warning">
                Vote Pending
              </Progress>
            ) : (
              <Progress value="100" color="success">
                Votes Recorded
              </Progress>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {props.candidateList.map(name => (
          <CandidateRow
            key={name}
            name={name}
            votes={props.votes[name]}
            votePending={props.votePending}
            onClick={props.voteHandler(name)}
          />
        ))}
      </tbody>
    </Table>
    <Button/>
  </div>
);

export default VotingTable;
