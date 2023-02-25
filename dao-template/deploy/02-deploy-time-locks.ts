import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { MIN_DELAY } from "../helper-hardhat-config";

const deployTimeLock: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Deploying Timelock...");
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    log: true,
    args: [MIN_DELAY, [], [], deployer],
  });

  log(`Deployed Timelock token to address ${timeLock.address}`);
};

export default deployTimeLock;
