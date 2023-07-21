import { ponder } from "@/generated";
import { zeroAddress } from "viem";

const DEFAULT_AUX = {
  multiplier: 0,
  lastDistance: BigInt(0),
  lastTimestamp: BigInt(0),
};

ponder.on("Citi:Transfer", async ({ event, context }) => {
  const { Account, Token, TransferEvent, YoinkEvent } = context.entities;
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
    id: event.params.id,
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
      token: event.params.id,
      transactionHash: event.transaction.hash,
      timestamp: Number(event.block.timestamp),
    },
  });

  if (event.params.from === zeroAddress) {
    // is mint
    await YoinkEvent.create({
      id: event.log.id,
      data: {
        from: undefined,
        to: event.params.to,
        token: event.params.id,
        timestamp: Number(event.block.timestamp),
        transactionHash: event.transaction.hash,
        value: event.transaction.value,
      },
    });
  }
});

ponder.on("Citi:BikeStolen", async ({ event, context }) => {
  const { BikeStolenEvent, YoinkEvent } = context.entities;

  await YoinkEvent.create({
    id: event.log.id,
    data: {
      from: event.params.from,
      to: event.params.to,
      token: event.params.id,
      timestamp: Number(event.block.timestamp),
      transactionHash: event.transaction.hash,
      value: event.transaction.value,
    },
  });

  await BikeStolenEvent.create({
    id: event.log.id,
    data: {
      from: event.params.from,
      to: event.params.to,
      value: event.transaction.value,
      token: event.params.id,
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
    id: event.params.id,
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
