import Promise from "bluebird";
import Web3 from "web3";

const { asciiToHex, hexToAscii } =
  // web3 1.X
  Web3.utils || {
    // web3 0.20.X
    asciiToHex: Web3.prototype.fromAscii,
    hexToAscii: Web3.prototype.toAscii,
  };

export default class Elections {
  constructor(contract, web3, account) {
    this.contract = contract
    this.web3 = web3
    this.account = account
  }

  createElection(electionName) {
    return this.sendTransaction('createElection', electionName)
  }

  addCandidate(electionName, key, name) {
    return this.sendTransaction('addCandidate', electionName, key, name)
  }

  sendTransaction(fnName, ...args) {
    return new Promise((resolve, reject) => {
      this.contract[fnName].sendTransaction(
        ...args,
        { from: this.account,
          gas: 1000000,
          gasPrice: 300
        },
        (err, transaction) => {
          if (err)
            reject(err)
          else
            this.waitForBlock(transaction).then(resolve)
        }
      )
    })
  }


  async waitForBlock(tx) {
    console.log(this.contract)
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
