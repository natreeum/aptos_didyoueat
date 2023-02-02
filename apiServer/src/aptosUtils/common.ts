// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

//:!:>section_1
const NODE_URL =
  process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL =
  process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";
//<:!:section_1
const aptosCoinStore = "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";

export { NODE_URL, FAUCET_URL, aptosCoinStore };
