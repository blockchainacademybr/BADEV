const PrivateNetwork = artifacts.require("PrivateNetwork");

module.exports = function(deployer) {
  deployer.deploy(PrivateNetwork, "0x9DB191Ec41D106AF9f6c7BCB1E8DCa3F308BED30");
};
