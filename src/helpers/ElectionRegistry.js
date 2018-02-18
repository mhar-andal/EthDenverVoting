import Promise from "bluebird";
import Web3 from "web3";

const { asciiToHex, hexToAscii } =
  // web3 1.X
  Web3.utils || {
    // web3 0.20.X
    asciiToHex: Web3.prototype.fromAscii,
    hexToAscii: Web3.prototype.toAscii,
  };

export default class ElectionRegistry {
  constructor(contract, web3) {
    this.contract = contract;
    this.web3 = web3;

    const getTransaction = Promise.promisify(
      this.contract._eth.getTransaction,
      { context: this.contract._eth }
    );

    this.methods = {
      getTransaction
    };
  }

  async waitForBlock(tx) {
    let elapsed = 0;
    let delay = 1000;
    while (elapsed < 10 * 60 * 1000) {
      console.log("WAITING WAITING");
      let txObject = await this.methods.getTransaction(tx);
      if (txObject && txObject.blockNumber) {
        return txObject;
      } else {
        await Promise.delay(delay);
        elapsed = elapsed + delay;
        delay = Math.floor(1.5 * delay);
      }
    }
    throw new Error("Timed out waiting for votes to be recorded in a block.");
  }

  fetchElectionContract(title) {
    while(title.length < 32)
      title = title + " "
    return new Promise((resolve, reject) => {
      this.contract.getElectionContract.call(
        asciiToHex(title),
        { from: this.web3.eth.accounts[0] },
        (err, election) => resolve(election)
      )
    })
  }

  newElection(title) {
    while(title.length < 32)
      title = title + " "

    // if you use Promise.promisify, it will return err instead of result >.<
    return new Promise((resolve, reject) => {
      this.contract.newElection.sendTransaction(
        asciiToHex(title),
        { from: this.web3.eth.accounts[0],
          gas: 1000000,
          gasPrice: 300
        },
        async (err, transaction) => {
          await this.waitForBlock(transaction)
          resolve(this.fetchElectionContract(title))
        }
      )
    })
  }
}
