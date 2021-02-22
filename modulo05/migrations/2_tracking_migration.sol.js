const TrackingAndPayment = artifacts.require("TrackingAndPayment");

module.exports = function(deployer) {
  deployer.deploy(TrackingAndPayment, "0x9DB191Ec41D106AF9f6c7BCB1E8DCa3F308BED30", "0x1cC60b9B1aa2fcd49824D5920e8dd8d6C4cbB8EE", "0x765FE7b318d40338dA4B4B6c4DB608207236ae96");
};
