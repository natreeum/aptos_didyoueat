const Poap = artifacts.require("./Poap.sol");
module.exports = function (deployer) {
  deployer.deploy(Poap);
};
