const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const fs = require("fs");
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const chainId = network.config.chainId;
    let ethUsdPriceFeedAddress;

    if (developmentChains.includes(network.name)) {
        const EthUsdAggregator = await ethers.getContract("MockV3Aggregator");
        ethUsdPriceFeedAddress = EthUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed;
    }

    console.log("Reading svgs...");
    const lowSVG = await fs.readFileSync("./images/dynamicNFT/frown.svg", { encoding: "utf-8" });
    const highSVG = await fs.readFileSync("./images/dynamicNFT/happy.svg", { encoding: "utf-8" });

    args = [ethUsdPriceFeedAddress, lowSVG, highSVG];
    console.log("Deploying dynamic svg nft...");
    const dynamicSvgNft = await deploy("DynamicSvgNft", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: 1,
    });
};

module.exports.tags = ["all", "dynamicsvg", "main"];
