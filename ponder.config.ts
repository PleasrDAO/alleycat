import type { Config } from "@ponder/core";
import { Address } from "viem";

const CHAIN_ID = parseInt(process.env.CHAIN_ID ?? "31337");

const NETWORK = [
  {
    name: "anvil",
    chainId: 31337,
    rpcUrl: "http://127.0.0.1:8545",
  },
  {
    name: "base-goerli",
    chainId: 84531,
    rpcUrl: process.env.QUICKNODE_BASE_GOERLI_RPC,
  },
  {
    name: "base",
    chainId: 8453,
    rpcUrl: process.env.QUICKNODE_BASE_MAINNET_RPC,
  },
].find((n) => n.chainId === CHAIN_ID)!;

export const config: Config = {
  networks: [NETWORK],
  contracts: [
    {
      network: "anvil",
      name: "Citi",
      address: "0x71C95911E9a5D330f4D621842EC243EE1343292e" as Address,
      abi: "./abis/Citi.json",
      startBlock: 0,
    },
    {
      network: "base-goerli",
      name: "Citi",
      address: process.env.CITI_ADDRESS! as Address,
      abi: "./abis/Citi.json",
      startBlock: 8767199,
    },
    {
      network: "base",
      name: "Citi",
      address: process.env.CITI_ADDRESS! as Address,
      abi: "./abis/Citi.json",
      startBlock: 2970031,
    },
  ].filter((config) => config.network === NETWORK.name),
};
