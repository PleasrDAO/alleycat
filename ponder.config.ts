import type { Config } from "@ponder/core";
import { Address } from "viem";

const NETWORK = (process.env.NETWORK ?? "anvil") as "anvil" | "base-goerli";

export const config: Config = {
  networks: [
    {
      name: "anvil",
      chainId: 1,
      rpcUrl: "http://127.0.0.1:8545",
    },
    {
      name: "base-goerli",
      chainId: 421613,
      rpcUrl: process.env.QUICKNODE_BASE_GOERLI_RPC,
    },
    {
      name: "base",
      chainId: 8453,
      rpcUrl: process.env.QUICKNODE_BASE_MAINNET_RPC,
    },
  ].filter((n) => n.name === NETWORK),
  contracts: [
    {
      network: "anvil",
      name: "Citi",
      address: "0xfFa47545acDC01Afa06Cc1eb02E86f6120fE575C" as Address,
      abi: "./abis/Citi.json",
      startBlock: 0,
    },
    {
      network: "base-goerli",
      name: "Citi",
      address: "0x6B378a2F14283426ACf49520403C5f5167F9Fe69" as Address,
      abi: "./abis/Citi.json",
      startBlock: 8597004,
    },
  ].filter((config) => config.network === NETWORK),
};

console.log(
  `Configured with network ${NETWORK} and contract ${config.contracts?.[0]?.address}`
);
