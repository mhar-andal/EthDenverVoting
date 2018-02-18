import React from "react";

import "./Homepage.css";

class Homepage extends React.Component {
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

export default Homepage;
