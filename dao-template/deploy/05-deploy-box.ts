import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying Box");
  const box = await deploy("Box", {
    from: deployer,
    log: true,
    args: [],
  });

  // Now that every is settled, transfer the ownership to the timelock
  // to make the whole app decentraliced
  const timeLock = await ethers.getContract("TimeLock");
  const boxContract = await ethers.getContractAt("Box", box.address);
  const transferOwner = await boxContract.transferOwnership(timeLock.address);
  await transferOwner.wait(1);
  log("Everything is settled");
};

export default deployBox;
