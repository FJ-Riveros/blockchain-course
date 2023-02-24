module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("====================");
  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: {
        name: "BoxProxyAdmin",
        artifact: "BoxProxyAdmin",
      },
    },
  });
};
