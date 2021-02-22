const HelloBA = artifacts.require("HelloBA");

module.exports = function(deployer) {
  deployer.deploy(HelloBA);
};
