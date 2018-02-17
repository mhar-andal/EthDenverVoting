import Promise from 'bluebird';
import Web3 from 'web3';
import { promisify } from 'util';

export default class ElectionRegistry {
  constructor(contract) {
    this.contract = contract;

    const getElectionContract = Promise.promisify(
      this.contract.getElectionContract.call,
      { context: this.contract.getElectionContract }
    );

    const newElection = Promise.promisify(
      this.contract.newElection.call,
      { context: this.contract.newElection }
    )

    this.methods = {
      getElectionContract,
      newElection
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
    throw new Error('Timed out waiting for votes to be recorded in a block.');
  }

  async fetchElectionContract(title) {
    const electionContract = await this.methods.getElectionContract(title);
  }

  async newElection(title) {
    return this.methods.newElection(title);
  }
}