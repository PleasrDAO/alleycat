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
      address: "0x840748F7Fd3EA956E5f4c88001da5CC1ABCBc038",
      abi: "./abis/Citi.json",
      startBlock: 17671250,
    },
  ],
};
