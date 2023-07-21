import type { Config } from "@ponder/core";
import { Address } from "viem";

const infuraUrl = (chain: string) =>
  `https://${chain}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;

export const config: Config = {
  networks: [
    // { name: "mainnet", chainId: 1, rpcUrl: process.env.PONDER_RPC_URL_1 },
    { name: "goerli", chainId: 5, rpcUrl: infuraUrl("goerli") },
    { name: "anvil", chainId: 1, rpcUrl: "http://127.0.0.1:8545" },
  ],
  contracts: [
    {
      network: "anvil",
      name: "Citi",
      address: "0x38F6F2caE52217101D7CA2a5eC040014b4164E6C" as Address,
      abi: "./abis/Citi.json",
      startBlock: 17671250,
    },
    {
      network: "goerli",
      name: "Citi",
      address: "0x91C259b9261593873d9705A2d85b6448e531BbB1" as Address,
      abi: "./abis/Citi.json",
      startBlock: 9383592,
    },
  ].filter((config) => config.network === (process.env.NETWORK as string)),
};
