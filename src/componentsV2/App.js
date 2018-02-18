import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";

import CreateElection from "./CreateElection";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import Web3AuthWrapper from "./Web3AuthWrapper";
import Voting from "./Voting";

const App = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Web3AuthWrapper>
          <Route exact path="/" component={Homepage} />
          <Route path="/election/create" component={CreateElection} />
          <Route path="/elections/:electionName/vote" component={Voting} />
          <Route path="/login" component={LoginPage} />
          <Route path="/vote" component={Voting} />
        </Web3AuthWrapper>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
