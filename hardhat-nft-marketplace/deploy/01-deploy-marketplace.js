module.exports = async function ({ getNamedAccounts, deployments }, hre) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deploying the nft market place...");
  await deploy("NftMarketplace", {
    from: deployer,
    log: true,
    waitConfirmations: 1,
  });
  const nftMarketPlace = await ethers.getContract("NftMarketplace");

  console.log(
    `NFT market place deployed at address ${nftMarketPlace.address}!`
  );
};

module.exports.tags = ["all", "nftmarketplace"];
