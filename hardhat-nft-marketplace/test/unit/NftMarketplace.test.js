const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");

describe("Nft Marketplace Tests", function () {
  let nftMarketplace, basicNft, player;
  const PRICE = ethers.utils.parseEther("0.1");
  const TOKEN_ID = 0;
  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    player = (await ethers.getSigners())[1];
    await deployments.fixture(["all"]);
    nftMarketplace = await ethers.getContract("NftMarketplace");
    basicNft = await ethers.getContract("BasicNft");
    await basicNft.mintNft();
    await basicNft.approve(nftMarketplace.address, TOKEN_ID);
  });

  it("lists and can be bought", async function () {
    await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE);
    const nftPlayer = await nftMarketplace.connect(player);
    await nftPlayer.buyItem(basicNft.address, TOKEN_ID, { value: PRICE });
    const newOwner = await basicNft.ownerOf(TOKEN_ID);
    const deployerProceeds = await nftMarketplace.getProceeds(deployer);
    assert(newOwner.toString() == player.address);
    assert(deployerProceeds.toString() == PRICE.toString());
  });
});
