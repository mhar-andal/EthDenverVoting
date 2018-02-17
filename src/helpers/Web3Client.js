import Web3 from 'web3';

// Supports multiple versions of web3
const { asciiToHex, hexToAscii } =
  // web3 1.X
  Web3.utils || {
    // web3 0.20.X
    asciiToHex: Web3.prototype.fromAscii,
    hexToAscii: Web3.prototype.toAscii,
  };

export default class Web3Client {
  constructor(web3) {
    this.web3 = web3;
    this.getAccounts = this.getAccounts.bind(this);
  }

  getAccounts() {
    return this.web3.eth.accounts;
  }
}