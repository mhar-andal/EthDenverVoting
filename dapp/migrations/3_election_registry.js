const deployInfo = require('../helpers/deployInfo');
const Web3 = require('web3');
const ElectionRegistry = artifacts.require('ElectionRegistry');

module.exports = async deployer => {
  await deployer.deploy(ElectionRegistry, 'Denver Governor Election');
  return deployInfo(deployer, ElectionRegistry);
};