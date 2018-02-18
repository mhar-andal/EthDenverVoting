const Elections = artifacts.require("Elections");

contract('Elections', function(accounts) {
  function strToBytes32(str) {
    while(str.length < 32)
      str = str + " "
    return str
  }

  function strToAddress(str) {
    return "0x" + strToBytes32(str)
  }

  const owner = accounts[0];

  it("happy path", function() {
    const e = strToBytes32("my election")
    const c1keyInt = 5 // strToAddress("c1key")
    const c1keyStr = "0x0000000000000000000000000000000000000005"
    const c1name = "sally someone"
    let elections;
    return Elections.deployed()
      .then(_elections => {
        elections = _elections
        return elections.createElection(e, {from: owner})
      })
      .then(() => elections.getNumCandidates.call(e))
      .then(num => assert.equal(num, 0, "No candidates yet"))
      .then(() => elections.addCandidate(e, c1keyInt, c1name, {from: owner}))
      .then(() => elections.getNumCandidates.call(e))
      .then(num => {
        assert.equal(num, 1, "One candidate")
        return elections
          .getCandidate.call(e, 0)
          .then(([key, name]) => {
            assert.equal(key, c1keyStr, 'keys should match')
            assert.equal(name, c1name, 'names should match')
          })
      })

    // return MetaCoin.deployed().then(instance =>
    //   instance.getBalance.call(accounts[0])
    // ).then(balance =>
    //   assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    // )
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
