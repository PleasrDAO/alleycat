import { ponder } from "@/generated";

const DEFAULT_AUX = {
  multiplier: 0,
  lastDistance: BigInt(0),
  lastTimestamp: BigInt(0),
};

ponder.on("Citi:Transfer", async ({ event, context }) => {
  const { Account, Token, TransferEvent } = context.entities;
  const { Citi } = context.contracts;

  // upsert `from`
  await Account.upsert({
    id: event.params.from,
    create: { ...DEFAULT_AUX },
    update: {},
  });

  // upsert `to`
  await Account.upsert({
    id: event.params.to,
    create: { ...DEFAULT_AUX },
    update: {},
  });

  const cost = await Citi.read.cost([event.params.id]);

  // upsert token
  await Token.upsert({
    id: String(event.params.id),
    create: {
      multiplier: 1, // initialize multiplier to 1
      cost,
      owner: event.params.to,
    },
    update: {
      cost,
      owner: event.params.to,
    },
  });

  // create a TransferEvent.
  await TransferEvent.create({
    id: event.log.id,
    data: {
      from: event.params.from,
      to: event.params.to,
      value: event.transaction.value,
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
      value: event.transaction.value,
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

ponder.on("Citi:RiderAuxUpdated", async ({ event, context }) => {
  const { Account } = context.entities;

  await Account.update({
    id: event.params.rider,
    data: {
      multiplier: event.params.multiplier,
      lastDistance: event.params.lastDistance,
      lastTimestamp: event.params.lastTimestamp,
    },
  });
});
