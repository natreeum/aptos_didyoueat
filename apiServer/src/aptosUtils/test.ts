import dotenv from "dotenv";
dotenv.config();

import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  TokenClient,
  CoinClient,
} from "aptos";
import { NODE_URL, FAUCET_URL } from "./common";

(async () => {
  // Create API and faucet clients.
  // :!:>section_1a
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); // <:!:section_1a

  // Create client for working with the token module.
  // :!:>section_1b
  const tokenClient = new TokenClient(client); // <:!:section_1b

  // Create a coin client for checking account balances.
  const coinClient = new CoinClient(client);

  // Create accounts.
  // :!:>section_2
  const admin = new AptosAccount();
  const receiver = new AptosAccount(); // <:!:section_2

  await faucetClient.fundAccount(admin.address(), 100_000_000);
  await faucetClient.fundAccount(receiver.address(), 100_000_000); // <:!:section_3

  const collectionName = "my first collection";
  const tokenName = "first token";
  const tokenPropertyVersion = 0;

  const tokenId = {
    token_data_id: {
      creator: admin.address().hex(),
      collection: collectionName,
      name: tokenName,
    },
    property_version: `${tokenPropertyVersion}`,
  };

  // Create the collection.
  // :!:>section_4
  const txnHash1 = await tokenClient.createCollection(
    admin,
    collectionName,
    "this is my first collection",
    "https://alice.com"
  ); // <:!:section_4
  await client.waitForTransaction(txnHash1, { checkSuccess: true });

  // Create a token in that collection.
  // :!:>section_5
  const txnHash2 = await tokenClient.createToken(
    admin,
    collectionName,
    tokenName,
    "this is my first token",
    1,
    "https://aptos.dev/img/nyan.jpeg"
  ); // <:!:section_5
  await client.waitForTransaction(txnHash2, { checkSuccess: true });

  // Print the collection data.
  // :!:>section_6
  const collectionData = await tokenClient.getCollectionData(
    admin.address(),
    collectionName
  );
  console.log(
    `my first collection: ${JSON.stringify(collectionData, null, 4)}`
  ); // <:!:section_6

  // Get the token balance.
  // :!:>section_7
  const adminBalance = await tokenClient.getToken(
    admin.address(),
    collectionName,
    tokenName,
    `${tokenPropertyVersion}`
  );
  console.log(`Admin token balance: ${adminBalance["amount"]}`); // <:!:section_7

  // Get the token data.
  // :!:>section_8
  const tokenData = await tokenClient.getTokenData(
    admin.address(),
    collectionName,
    tokenName
  );
  console.log(`Admin token data: ${JSON.stringify(tokenData, null, 4)}`); // <:!:section_8
})();
