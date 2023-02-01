const MyNFTs = artifacts.require("./MyNFTs.sol");
module.exports = function (deployer) {
  deployer.deploy(MyNFTs);
};
