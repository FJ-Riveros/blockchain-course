const { deployments, network, ethers } = require("hardhat");
const { assert } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");
const { hasRestParameter } = require("typescript");
const { EtherscanProvider } = require("@ethersproject/providers");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT tests", function () {
          let accounts, deployer, basicNft;
          beforeEach(async () => {
              accounts = await ethers.getSigners();
              deployer = accounts[0];
              await deployments.fixture();
              basicNft = await ethers.getContract("BasicNFT");
          });

          it("Mints an NFT and assigns it to the msg sender", async () => {
              const mint = await basicNft.mintNFT({ from: deployer.address });
              const receipt = await mint.wait(1);
              const { nftId } = receipt.events.find((event) => event.event === "mintedNft").args;
              const nftOwner = await basicNft.ownerOf(parseInt(nftId));
              assert(nftOwner === deployer.address);
          });
      });
