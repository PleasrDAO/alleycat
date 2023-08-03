import type { Config } from "@ponder/core";
import { Address } from "viem";

const NETWORK = process.env.NETWORK ?? "anvil";

const infuraUrl = (chain: string) =>
  `https://${chain}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;

export const config: Config = {
  networks: [
    {
      name: "arbitrum-goerli",
      chainId: 421613,
      rpcUrl: infuraUrl("arbitrum-goerli"),
    },
    { name: "anvil", chainId: 1, rpcUrl: "http://127.0.0.1:8545" },
  ].filter((network) => network.name === NETWORK),
  contracts: [
    {
      network: "anvil",
      name: "Citi",
      address: "0x38F6F2caE52217101D7CA2a5eC040014b4164E6C" as Address,
      abi: "./abis/Citi.json",
      startBlock: 17671250,
    },
    {
      network: "arbitrum-goerli",
      name: "Citi",
      address: "0x2a205Ecc5573E5aA9C6493599cc9ddFDB872995a" as Address,
      abi: "./abis/Citi.json",
      startBlock: 32816388,
    },
  ].filter((config) => config.network === NETWORK),
};

console.log(
  `Configured with network ${NETWORK} and contract ${config.contracts?.[0]?.address}`
);
