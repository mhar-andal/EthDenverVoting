// @flow

import React from "react";
import { Badge } from 'reactstrap';

// const votingTableProps = {
//   candidateList: {},
//   votes: { name },
//   voteHandler: () => {},
//   votePending: false,
// };

export default class UserHeading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: 'Test',
      lastName: 'User',
      address: '0x245c60ebad',
    };
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.firstName} {this.state.lastName}   <Badge color="secondary">{this.state.address}</Badge>
        </h1>
      </div>
    );
  }
}
