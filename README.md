# alleycat

an indexer for citi

- [ ] power leaderboard

### queries

```gql
query GetUserQuery($owner: String!) {
  account(id: $owner) {
    id
    multiplier
    lastDistance
    lastTimestamp
    tokens {
      id
      multiplier
    }
  }
}
```

```gql
query BikeInfo($tokenId: String!) {
  token(id: $tokenId) {
    multiplier
  }
  # the mint event
  transferEvents(where:{from: "0x0000000000000000000000000000000000000000", token: $tokenId}) {
    id
    to {
      id
    }
    hash
    timestamp
  }
}
```
