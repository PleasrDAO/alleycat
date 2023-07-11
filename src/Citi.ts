import { Citi, ponder } from "@/generated";
import { zeroAddress } from "viem";

async function fetchAuxForAccount(address: `0x${string}`, citi: Citi) {
  if (address === zeroAddress) {
    return { multiplier: 0, lastDistance: BigInt(0), lastTimestamp: BigInt(0) };
  }

  const [multiplier, lastDistance, lastTimestamp] = await citi.read.getRiderAux(
    [address]
  );

  return { multiplier, lastDistance, lastTimestamp };
}

ponder.on("Citi:Transfer", async ({ event, context }) => {
  const { Account, Token, TransferEvent } = context.entities;
  const { Citi } = context.contracts;

  const [fromAux, toAux] = await Promise.all([
    fetchAuxForAccount(event.params.from, Citi),
    fetchAuxForAccount(event.params.to, Citi),
  ]);

  // Create an Account for the sender, or update the balance if it already exists.
  await Account.upsert({
    id: event.params.from,
    create: { ...fromAux },
    update: { ...fromAux },
  });

  // Create an Account for the recipient, or update the balance if it already exists.
  await Account.upsert({
    id: event.params.to,
    create: { ...toAux },
    update: { ...toAux },
  });

  // Create or update a Token.
  await Token.upsert({
    id: String(event.params.id),
    create: {
      owner: event.params.to,
      multiplier: 1,
    },
    update: {
      owner: event.params.to,
    },
  });

  // Create a TransferEvent.
  await TransferEvent.create({
    id: event.log.id,
    data: {
      from: event.params.from,
      to: event.params.to,
      token: String(event.params.id),
      transactionHash: event.transaction.hash,
      timestamp: Number(event.block.timestamp),
    },
  });
});

ponder.on("Citi:BikeStolen", async ({ event, context }) => {
  const { BikeStolenEvent } = context.entities;

  await BikeStolenEvent.create({
    id: event.log.id,
    data: {
      from: event.params.from,
      to: event.params.to,
      token: String(event.params.id),
      transactionHash: event.transaction.hash,
      timestamp: Number(event.block.timestamp),
    },
  });
});

ponder.on("Citi:BikeRevealed", async ({ event, context }) => {
  const { Token } = context.entities;
  const { Citi } = context.contracts;

  const [multiplier, traits] = await Promise.all([
    Citi.read.getMultiplier([event.params.id]),
    Citi.read.getTraits([event.params.id]),
  ]);

  await Token.update({
    id: String(event.params.id),
    data: {
      multiplier,
      ...traits,
    },
  });
});
