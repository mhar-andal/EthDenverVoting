import React from "react";
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

  addCandidateFields = () => {
    console.log("this.state", this.state);
    const textField = createTextInput("Add Candidate", console.log);
    this.setState({
      textFields: [...this.state.textFields, textField]
    });
    console.log("this.state after", this.state);
  };

  handleSubmit = () => {};

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
        {this.state.textFields.map(TextField => {
          return <TextField />;
        })}
        {/* <span className="f-left">
          <FlatButton
            className="add-candidate"
            label="Add Candidate"
            onClick={this.addCandidateFields}
          />
        </span> */}
        <span className="f-left">
          <FlatButton
            labelStyle={{
              color: "white"
            }}
            hoverColor="#b70b2a"
            backgroundColor="rgb(0, 40, 104)"
            label="Submit"
            onClick={this.addCandidateFields}
          />
        </span>
      </div>
    );
  }
}

export default CreateElection;
