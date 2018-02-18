import React from "react";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3
    };
  }

  render() {
    return <div>h</div>;
  }
}

export default Homepage;
