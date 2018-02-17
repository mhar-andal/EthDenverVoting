import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { Table, Button, Container } from "reactstrap";
import { StyledTitle } from "../styles/StyledTitle";
import { Strong } from "../styles/Strong";
import { Arrow } from "../styles/Arrow";
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
  positionY: "50%",
  float: "right"
};

const styleBack = {
  margin: 12,
  positionY: "50%",
  float: "left"
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
      <div>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label="Home" value="a">
            <Container>
              <Strong>Make it count</Strong>
              <StyledTitle>Vote</StyledTitle>
            </Container>
            <Button
              color="primary"
              style={style}
              onClick={() => {
                this.handleChange("b");
              }}
            >
              <Arrow>></Arrow>
            </Button>
          </Tab>
          <Tab label="Vote" value="b">
            {this.props.votingTable}
            <Button
              color={"primary"}
              style={style}
              onClick={() => {
                this.handleChange("c");
              }}
            >
              <Arrow>></Arrow>
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
              <Arrow> {"<"} </Arrow>
            </Button>
            <Button
              color="primary"
              style={style}
              onClick={() => {
                this.handleChange("d");
              }}
            >
              <Arrow>></Arrow>
            </Button>
          </Tab>
        </Tabs>
      </div>
    ) : (
      <Container>
        <div>
          <Strong />
          <StyledTitle>Thanks</StyledTitle>
          <Strong>
            Thanks for voting, {this.props.firstName} {this.props.lastName}!
          </Strong>
        </div>
      </Container>
    );
  }
}
