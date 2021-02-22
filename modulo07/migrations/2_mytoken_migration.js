const MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
  deployer.deploy(MyToken, 10000000000, "BA Token", 8, "BAT");
};
