const Elections = artifacts.require("Elections");

contract('Elections', function(accounts) {
  function strToBytes32(str) {
    while(str.length < 32)
      str = str + " "
    return "0x" + str.split("").map(c => c.charCodeAt(0).toString(16)).join('')
  }

  function strToAddress(str) {
    return "0x" + strToBytes32(str)
  }

  const owner  = accounts[0]
  const voter1 = accounts[1]
  const voter2 = accounts[2]
  const voter3 = accounts[3]

  it("happy path", function() {
    const e = strToBytes32("my election")

    // candidate 1
    const c1keyInt = 5 // strToAddress("c1key")
    const c1keyStr = "0x0000000000000000000000000000000000000005"
    const c1name = "Sally Someone"

    // candidate 2
    const c2keyInt = 6 // strToAddress("c2key")
    const c2keyStr = "0x0000000000000000000000000000000000000006"
    const c2name   = "Percy Person"

    // voter 1

    let elections;

    return Elections.deployed()
      .then(_elections => elections = _elections)

      // create the election
      .then(() => elections.getNumElections()).then(n => assert.equal(n, 0, "Shouldn't have elections!"))
      .then(() => elections.createElection(e, {from: owner}))
      .then(() => elections.getNumElections()).then(n => assert.equal(n, 1, "Election wasn't created"))
      .then(() => elections.getElection.call(0))
      .then(([name, numCandidates]) => {
        assert.equal(name, e, "Names don't match!")
        assert.equal(numCandidates, 0, "Where did this candidate come from?!")
      })

      // add candidates
      .then(() => elections.getNumCandidates.call(e)).then(n => assert.equal(n, 0, "Where did this candidate come from?!"))
      .then(() => elections.addCandidate(e, c1keyInt, c1name, {from: owner}))
      .then(() => elections.getNumCandidates.call(e)).then(n => assert.equal(n, 1, "Candidate wasn't added"))
      .then(() => elections.addCandidate(e, c2keyInt, c2name, {from: owner}))
      .then(() => elections.getNumCandidates.call(e)).then(n => assert.equal(n, 2, "Candidate wasn't added"))
      .then(() => elections.getCandidate.call(e, 0)).then(([key, name, numVotes]) => {
        assert.equal(key, c1keyStr, "keys don't match")
        assert.equal(name, c1name, "names don't match")
        assert.equal(numVotes, 0, "votes don't match")
      })
      .then(() => elections.getCandidate.call(e, 1)).then(([key, name, numVotes]) => {
        assert.equal(key, c2keyStr, "keys don't match")
        assert.equal(name, c2name, "names don't match")
        assert.equal(numVotes, 0, "votes don't match")
      })

      // fkn vote, y'all
      .then(() => elections.getVotes(e, 0)).then((n) => assert.equal(n, 0, 'Should not be any votes yet!'))
      .then(() => elections.getVotes(e, 1)).then((n) => assert.equal(n, 0, 'Should not be any votes yet!'))
      .then(() => elections.vote(e, 0, {from: voter1}))
      .then(() => elections.vote(e, 0, {from: voter2}))
      .then(() => elections.vote(e, 1, {from: voter3}))
      .then(() => elections.getVotes(e, 0)).then((n) => assert.equal(n, 2, 'Voters 1 and 2 voted for candidate 1'))
      .then(() => elections.getVotes(e, 1)).then((n) => assert.equal(n, 1, 'Voter 3 voted for candidate 2'))
      .then(() => elections.getCandidate.call(e, 0)).then(([key, name, numVotes]) => {
        assert.equal(key, c1keyStr, "keys don't match")
        assert.equal(name, c1name, "names don't match")
        assert.equal(numVotes, 2, "votes don't match")
      })
  })

  // it("should send coin correctly", function() {
  //   var meta;

  //   // Get initial balances of first and second account.
  //   var account_one = accounts[0];
  //   var account_two = accounts[1];

  //   var account_one_starting_balance;
  //   var account_two_starting_balance;
  //   var account_one_ending_balance;
  //   var account_two_ending_balance;

  //   var amount = 10;

  //   return MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_starting_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_starting_balance = balance.toNumber();
  //     return meta.sendCoin(account_two, amount, {from: account_one});
  //   }).then(function() {
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_ending_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_ending_balance = balance.toNumber();

  //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
  //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  //   });
  // });
})
