import React from "react";
import { BrowserRouter, withRouter } from "react-router-dom";

import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      accounts: props.accounts
    };
  }

  renderChildren = () => {
    return React.Children.map(this.props.children, child => {
      if (child.type === React.Child) {
        return React.cloneElement(child, {
          ...this.state,
          ...this.props
        });
      } else {
        return child;
      }
    });
  };

  render() {
    console.log("props", this.props);
    return (
      <div>
        <AppBar
          title={
            <a
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Absentee Voting
            </a>
          }
        >
          <div>
            <RaisedButton
              label="New Election"
              style={{ marginTop: 6 }}
              onClick={() => {
                this.props.history.push("/election/create");
              }}
            />
          </div>
        </AppBar>
        {this.renderChildren()}
      </div>
    );
  }
}

export default withRouter(AppContainer);
