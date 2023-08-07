import type { Config } from "@ponder/core";
import { Address } from "viem";

const NETWORK = (process.env.NETWORK ?? "anvil") as "anvil" | "arbitrum-goerli";

const infuraUrl = (chain: string) =>
  `https://${chain}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;

export const config: Config = {
  network: {
    anvil: {
      name: "anvil",
      chainId: 1,
      rpcUrl: "http://127.0.0.1:8545",
    },
    "arbitrum-goerli": {
      name: "arbitrum-goerli",
      chainId: 421613,
      rpcUrl: infuraUrl("arbitrum-goerli"),
    },
  }[NETWORK],
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
      address: "0x0d50883543595Dc2E0C009DCBBD2d8ECf9b31F3E" as Address,
      abi: "./abis/Citi.json",
      startBlock: 33317104,
    },
  ].filter((config) => config.network === NETWORK),
};

console.log(
  `Configured with network ${NETWORK} and contract ${config.contracts?.[0]?.address}`
);
