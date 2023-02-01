import { poapContract } from './setting';

async function updateCollection(collectionName: string, metaURI: string) {
  console.log('this is update');
  try {
    const result = await poapContract.methods
      .updateCollection(collectionName, metaURI)
      .send({ from: process.env.SERVER_ADDR, gas: 1000000 });

    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { updateCollection };
