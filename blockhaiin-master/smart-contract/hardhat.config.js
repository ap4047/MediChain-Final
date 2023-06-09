require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    ganache:{
      url: "HTTP://127.0.0.1:7545",
      accounts:["01c7de997ad3916169f7d768aa95f6d30cce9eb0f030dea67ec7ccdbd659eab7"],
      chainId: 1337
    },
    sepolia:{
      url: "https://eth-sepolia.g.alchemy.com/v2/eWrgPoDb9LCKoEHSHBytC9tO-sofMGTE",
      accounts: ["a1d22fd52eabebfd8df82d3b7f3f6528a1edebfa6065683c898210f379614db5"],
      chainId: 11155111
    }
  }
};
