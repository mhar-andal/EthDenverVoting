/* global process */
//
// import React from 'react';

import App from "./componentsV2/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "rgb(0, 40, 104)"
  },
  appBar: {
    height: 50
  }
});

const Main = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App {...props} />
  </MuiThemeProvider>
);

// export default Main;

const env = {
  network: "development" // Default to Ganache CLI
};
ReactDOM.render(<Main {...env} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
