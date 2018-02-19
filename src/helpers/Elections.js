import Promise from "bluebird";

export default class Elections {
  constructor(contract, web3, account) {
    this.contract = contract
    this.web3 = web3
    this.account = account
  }

  createElection(electionName, closesAt) {
    const closesAtSec = parseInt(
      (closesAt.getTime() - closesAt.getMilliseconds()) / 1000
    )
    return this._sendTransaction('createElection', electionName, closesAtSec)
  }
  getNumElections() {
    throw new Error("Not implemented");
  }
  getElectionByIndex(index) {
    throw new Error("Not implemented");
  }
  getElectionByName(name) {
    return this._call('getElectionById', name)
      .then(([id, numCandidates, secondsLeft]) => {
        const closesAt = new Date()
        closesAt.setTime(1000*secondsLeft)
        return { numCandidates, closesAt }
      })
  }


  addCandidate(electionName, key, name) {
    return this._sendTransaction('addCandidate', electionName, key, name)
  }
  getNumCandidates(election) {
    return this._call('getNumCandidates', election)
  }
  getCandidateByIndex(election, index) {
    return this._call('getCandidate', election, index)
      .then(([address, name, numVotes]) => ({
        address, name, numVotes: numVotes.toNumber()
      }))
  }

  vote(election, index) {
    console.log('vote', election, index)
    return this._sendTransaction('vote', election, index)
  }
  getNumVotes(election, index) {
    return this._call('getVotes', election, index)
  }



  _call(fnName, ...args) {
    return new Promise((resolve, reject) => {
      this.contract[fnName].call(
        ...args,
        { from: this.account },
        (err, result) => err ? reject(err) : resolve(result)
      )
    })
  }

  _sendTransaction(fnName, ...args) {
    return new Promise((resolve, reject) => {
      this.contract[fnName].sendTransaction(
        ...args,
        { from: this.account,
          gas: 1000000,
          gasPrice: 300
        },
        (err, transaction) =>
          err ? reject(err) : this._waitForBlock(transaction).then(resolve)
      )
    })
  }

  async _waitForBlock(tx) {
    const getTransaction = Promise.promisify(
      this.contract._eth.getTransaction,
      { context: this.contract._eth }
    );
    let elapsed = 0;
    let delay = 1000;
    while (elapsed < 10 * 60 * 1000) {
      console.log("WAITING WAITING");

      let txObject = await getTransaction(tx);
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
}
