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
      address: "0xfFa47545acDC01Afa06Cc1eb02E86f6120fE575C" as Address,
      abi: "./abis/Citi.json",
      startBlock: 0,
    },
    {
      network: "base-goerli",
      name: "Citi",
      address: "0xC49517548f55D2db8155bb8815EF1f2E69E4a0bC" as Address,
      abi: "./abis/Citi.json",
      startBlock: 8767199,
    },
    {
      network: "base",
      name: "Citi",
      address: "" as Address,
      abi: "./abis/Citi.json",
      startBlock: 0,
    },
  ].filter((config) => config.network === NETWORK.name),
};
