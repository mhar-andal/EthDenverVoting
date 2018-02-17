import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = value => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
              <Tab label="Vote" value="a">
          {this.props.votingTable}
        </Tab>
        <Tab label="Results" value="b">
          {this.props.resultsTable}
        </Tab>
      </Tabs>
    );
  }
}