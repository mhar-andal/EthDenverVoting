import React from "react";
import PropTypes from 'prop-types';
import { isEmpty } from "lodash";

import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import "./Utils.css";
import "./CreateElection.css";

const createTextInput = (labelText, handleMethod, candidateId) => {
  return (
    <TextField
      floatingLabelFixed={true}
      floatingLabelText={labelText}
      fullWidth={true}
      onChange={obj => handleMethod(obj.target.value, candidateId)}
    />
  );
};

class CreateElection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formFields: {
        electionName: "",
        candidateFieldNames: {
          candidate1: {
            name: ""
          },
          candidate2: {
            name: ""
          }
        }
      },
      web3: props.web3,
      accounts: props.accounts,
      textFields: []
    };
  }

  componentWillMount() {
    this.state.textFields.push(() => {
      return createTextInput("Election Name", this.handleElectionName);
    });
    this.state.textFields.push(() => {
      return createTextInput(
        "Candidate Name",
        this.handleCandidateName,
        "candidate1"
      );
    });
    this.state.textFields.push(() => {
      return createTextInput(
        "Candidate Name",
        this.handleCandidateName,
        "candidate2"
      );
    });
  }

  handleSubmit = async () => {
    const election = this.state.formFields.electionName
    await this.context.elections.createElection(election)
    await this.context.elections.addCandidate(
      election,
      1, // FIXME
      this.state.formFields.candidateFieldNames.candidate1.name
    )
    await this.context.elections.addCandidate(
      election,
      2, // FIXME
      this.state.formFields.candidateFieldNames.candidate1.name
    )
  };

  handleCandidateName = (value, candidateId) => {
    this.setState({
      formFields: {
        ...this.state.formFields,
        candidateFieldNames: {
          ...this.state.formFields.candidateFieldNames,
          [candidateId]: {
            name: value
          }
        }
      }
    });
  };

  handleElectionName = value => {
    this.setState({
      formFields: {
        electionName: value
      }
    });
  };

  render() {
    const { accounts } = this.props;
    console.log("props", this.props);
    console.log("state", this.state);
    return (
      <div className="container">
        <h1>Welcome to the Election Creator.</h1>
        {this.state.textFields.map((TextField, i) =>
          <TextField key={i}/>)
        }
        <span className="f-left">
          <FlatButton
            labelStyle={{
              color: "white"
            }}
            hoverColor="#b70b2a"
            backgroundColor="rgb(0, 40, 104)"
            label="Submit"
            onClick={this.handleSubmit}
          />
        </span>
      </div>
    );
  }
}

CreateElection.contextTypes = {
  elections: PropTypes.object,
};

export default CreateElection;
