import React from "react";
import { isEmpty } from "lodash";

import PropTypes from "prop-types";

import "./Homepage.css";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3
    };
  }

  renderFlag = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="540" height="300">
        <path d="M0 0H600V360H0" fill="#002868" />
        <path d="M0 360V221L120 88 300 288 480 88 600 221v139" fill="#fff" />
        <path
          d="M0 360V293L120 160 300 360 480 160 600 293v67"
          fill="#bf0a30"
        />
        <circle cx="300" cy="100" r="65" fill="#ffd700" />
      </svg>
    );
  };

  render() {
    const { accounts } = this.props;
    console.log("props", this.context);
    const firstAccount = !isEmpty(accounts) && accounts[0];
    return (
      <div className="container">
        <div className="pad-1">{this.renderFlag()}</div>
        <h1>Welcome {}!</h1>
        <div className="content-section">
          Vote with this secure, blockchain-powered voting system.
        </div>
      </div>
    );
  }
}

Homepage.childContextTypes = {
  web3: PropTypes.object,
  accounts: PropTypes.array
};

export default Homepage;
