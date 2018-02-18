import Promise from "bluebird";
import Web3 from "web3";
import { promisify } from "util";

export default class ElectionRegistry {
  constructor(contract, web3) {
    this.contract = contract;
    this.web3 = web3;

    const getElectionContract = Promise.promisify(
      this.contract.getElectionContract.call,
      { context: this.contract.getElectionContract }
    );

    const newElection = Promise.promisify(
      this.contract.newElection.call,
      { context: this.contract.newElection }
    );

    const getTransaction = Promise.promisify(
      this.contract._eth.getTransaction,
      { context: this.contract._eth },
    );

    this.methods = {
      getElectionContract,
      newElection,
      getTransaction,
    };
  }

  async waitForBlock(tx) {
    let elapsed = 0;
    let delay = 1000;
    while (elapsed < 10 * 60 * 1000) {
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

  async fetchElectionContract(title) {
    const electionContract = await this.methods.getElectionContract(title);
  }

  async newElection(title, address) {
    const tx = await this.methods.newElection("poop", {
      from: this.web3.eth.accounts[0],
      gas: 1000000,
      gasPrice: 300,
    });
    await this.waitForBlock(tx)
  }
}
