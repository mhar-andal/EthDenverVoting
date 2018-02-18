import React from "react";
import Promise from "bluebird";
import Web3 from "web3";

import AppContainer from "./AppContainer";

class Web3AuthWrapper extends React.Component {
  state = {
    authenticated: false,
    web3: null
  };
  async componentDidMount() {
    if (window.web3 !== "undefined") {
      let web3 = new Web3(window.web3.currentProvider);
      const accounts = await Promise.promisify(web3.eth.getAccounts)();
      this.setState({
        authenticated: true,
        web3,
        accounts
      });
    }
  }

  render() {
    return this.state.authenticated ? (
      <AppContainer {...this.state}>{this.props.children}</AppContainer>
    ) : (
      <div>Error</div>
    );
  }
}

export default Web3AuthWrapper;
