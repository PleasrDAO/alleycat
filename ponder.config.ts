import type { Config } from "@ponder/core";

export const config: Config = {
  networks: [
    // { name: "mainnet", chainId: 1, rpcUrl: process.env.PONDER_RPC_URL_1 },
    { name: "anvil", chainId: 1, rpcUrl: "http://127.0.0.1:8545" },
  ],
  contracts: [
    {
      network: "anvil",
      name: "Citi",
      address: "0x38F6F2caE52217101D7CA2a5eC040014b4164E6C",
      abi: "./abis/Citi.json",
      startBlock: 17671250,
    },
  ],
};
