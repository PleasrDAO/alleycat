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
      address: "0x09E30f21418BBaa24d08c9B77076BF74af82bE35" as Address,
      abi: "./abis/Citi.json",
      startBlock: 8553075,
    },
  ].filter((config) => config.network === NETWORK),
};

console.log(
  `Configured with network ${NETWORK} and contract ${config.contracts?.[0]?.address}`
);
