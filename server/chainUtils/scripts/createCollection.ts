import { poapContract } from './setting';

async function createCollection(
  collectionName: string,
  owner: string,
  metaURI: string,
) {
  console.log(poapContract);
  try {
    const result = await poapContract.methods
      .createCollection(collectionName, owner, metaURI)
      .send({ from: process.env.SERVER_ADDR, gas: 1000000 });

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { createCollection };
