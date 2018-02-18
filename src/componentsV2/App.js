import React from "react";
import Web3 from "web3";
import Promise from "bluebird";

import { BrowserRouter, Switch, withRouter } from "react-router-dom";
import { Route } from "react-router";

import CreateElection from "./CreateElection";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import Web3AuthWrapper from "./Web3AuthWrapper";

const withInjectedWeb3Auth = WrappedComponent => {
  const Web3Component = class extends React.Component {
    state = {
      web3: null
    };
    async componentDidMount() {
      if (window.web3 !== "undefined") {
        let web3 = new Web3(window.web3.currentProvider);
        const accounts = await Promise.promisify(web3.eth.getAccounts)();
        this.setState({
          web3,
          accounts
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };

  return Web3Component;
};

const App = props => {
  return (
    <BrowserRouter>
      <Web3AuthWrapper>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/election/create" component={CreateElection} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Web3AuthWrapper>
    </BrowserRouter>
  );
};

export default App;
