module.exports = async function ({ deployments, getNamedAccounts }, hre) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deploying BasicNft...");
  await deploy("BasicNft", {
    from: deployer,
    logs: true,
    waitConfirmations: 1,
  });
  const basicNft = await ethers.getContract("BasicNft");
  console.log(`Deployed basic NFT at ${basicNft.address}`);
};

module.exports.tags = ["all", "basicNft"];
