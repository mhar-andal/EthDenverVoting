import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { Table, Button, Progress, Container } from "reactstrap";
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};

const style = {
  margin: 12,
  float: "right"
};

const styleBack = {
  margin: 12
};

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "a"
    };
  }
  handleChange = value => {
    this.setState({
      value: value
    });
  };

  render() {
    return this.state.value !== "d" ? (
      <Tabs value={this.state.value} onChange={this.handleChange}>
        <Tab label="Home" value="a">
          <Container>
            <div>
              <h1>
                Welcome {this.props.firstName} {this.props.lastName}!
              </h1>
              <h2>Absentee Voting</h2>
              Vote using this blockchain-powered voting system to ensure your
              voice gets heard.
            </div>
            <Button
              color="primary"
              style={style}
              onClick={() => {
                this.handleChange("b");
              }}
            >
              Get Started
            </Button>
          </Container>
        </Tab>
        <Tab label="Vote" value="b">
          {this.props.votingTable}
          <Button
            color="primary"
            style={style}
            onClick={() => {
              this.handleChange("c");
            }}
          >
            Submit
          </Button>
        </Tab>
        <Tab label="Review" value="c">
          {this.props.resultsTable}
          <Button
            color="primary"
            style={styleBack}
            onClick={() => {
              this.handleChange("b");
            }}
          >
            Back
          </Button>
          <Button
            color="primary"
            style={style}
            onClick={() => {
              this.handleChange("d");
            }}
          >
            Submit
          </Button>
        </Tab>
      </Tabs>
    ) : (
      <Container>
        <div>
          <h1>Votes Finalized</h1>
          Thanks for voting, {this.props.firstName} {this.props.lastName}!
        </div>
      </Container>
    );
  }
}
