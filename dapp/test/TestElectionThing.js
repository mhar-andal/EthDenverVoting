const Elections = artifacts.require("Elections");

contract('Elections', function(accounts) {
  function strToBytes32(str) {
    while(str.length < 32)
      str = str + " "
    return str
  }

  const owner = accounts[0];

  it("happy path", function() {
    const e = strToBytes32("my election")
    let elections;
    return Elections.deployed()
      .then(_elections => {
        elections = _elections
        return elections.createElection(e, {from: owner})
      })
      .then(() => elections.getCandidates.call(e))
      .then(candidates => assert.equal(candidates.length, 0, "No candidates yet"))
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
