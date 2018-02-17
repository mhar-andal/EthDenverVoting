/* global process */
//
// import React from 'react';
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import {
  blueA700,
  blueA400,
  redA700,
  white,
  darkBlack,
  fullBlack
} from "material-ui/styles/colors";
import spacing from "material-ui/styles/spacing";
import React from "react";
import ReactDOM from "react-dom";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";

const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary1Color: blueA700,
    primary2Color: blueA700,
    accent1Color: redA700,
    pickerHeaderColor: blueA400
  }
});

const Main = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppBar title="Absentee Voting" />
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
