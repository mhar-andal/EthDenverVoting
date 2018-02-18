import React from "react";

class CreateElection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3
    };
  }

  render() {
    console.log("mounting");
    return <div>New field</div>;
  }
}

export default CreateElection;
