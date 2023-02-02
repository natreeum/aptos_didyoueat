import dotenv from "dotenv";
dotenv.config();

//description
//uri
//

import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  TokenClient,
  CoinClient,
} from "aptos";
import { NODE_URL, FAUCET_URL } from "./common";

const createCollection = async () => {
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); // <:!:section_1a

  // Create client for working with the token module.
  // :!:>section_1b
  const tokenClient = new TokenClient(client); // <:!:section_1b

  // Create a coin client for checking account balances.
  const coinClient = new CoinClient(client);

  const receiver = new AptosAccount(); // <:!:section_2
  await faucetClient.fundAccount(receiver.address(), 100_000_000);

  const collectionName = "my first collection";

  const txnHash1 = await tokenClient.createCollection(
    receiver,
    collectionName,
    "this is my first collection",
    "https://alice.com"
  ); // <:!:section_4
  await client.waitForTransaction(txnHash1, { checkSuccess: true });
};

export { createCollection };
