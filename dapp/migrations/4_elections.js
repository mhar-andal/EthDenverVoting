const deployInfo = require('../helpers/deployInfo');
const ElectionRegistry = artifacts.require('Elections');

module.exports = async deployer => {
  await deployer.deploy(ElectionRegistry);
  return deployInfo(deployer, ElectionRegistry);
};
