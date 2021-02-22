const Store = artifacts.require("Store");

module.exports = function(deployer) {
  deployer.deploy(Store, 10, 10000000000000); // 0.01 ETH each product
};
