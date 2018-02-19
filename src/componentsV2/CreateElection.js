import React from "react";
import PropTypes from "prop-types";

import DatePicker from "material-ui/DatePicker";
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
        disableButton: false,
        electionName: "",
        candidateFieldNames: {
          candidate1: { name: "" },
          candidate2: { name: "" }
        },
        deadlineDate: null
      },
      web3: props.web3,
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

  handleDatePicker = value => {
    console.log("val", value);
    this.setState({
      formFields: {
        ...this.state.formFields,
        deadlineDate: value
      }
    });
  };

  handleSubmit = async () => {
    this.setState({
      disableButton: true
    });
    const election = this.state.formFields.electionName;
    await this.context.elections.createElection(
      election,
      this.state.formFields.deadlineDate
    );
    await this.context.elections.addCandidate(
      election,
      1, // FIXME
      this.state.formFields.candidateFieldNames.candidate1.name
    );
    await this.context.elections.addCandidate(
      election,
      2, // FIXME
      this.state.formFields.candidateFieldNames.candidate2.name
    );
    this.props.history.push(`/elections/${election}/vote`);
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
    return (
      <div className="container">
        <h1>Welcome to the Election Creator.</h1>
        {this.state.textFields.map((TextField, i) => <TextField key={i} />)}

        <div className="f-left display-block">
          <DatePicker
            hintText="End Date"
            onChange={(_, date) => {
              this.handleDatePicker(date);
            }}
            fullWidth={true}
            minDate={new Date()}
          />
        </div>

        <div className="display-block button-submit">
          <FlatButton
            disabled={this.state.disableButton}
            className="submit-button"
            hoverColor="#b70b2a"
            backgroundColor="rgb(0, 40, 104)"
            label="Submit"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

CreateElection.contextTypes = {
  elections: PropTypes.object
};

export default CreateElection;
