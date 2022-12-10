
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { task } = require("hardhat/config");
require('dotenv').config()


module.exports = {
  defaultNetwork:"goerli",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  solidity: "0.8.4",
};



