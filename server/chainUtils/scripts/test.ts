import { testContract } from './setting';

async function testFunction() {
  // console.log(testContract);
  // console.log(process.env.SERVER_ADDR);

  testContract.methods.name().call().then(console.log);
  testContract.methods
    .mintNFT(
      'https://urclass-images.s3.ap-northeast-2.amazonaws.com/beb/section4/unit4/test.json',
    )
    .send({ from: process.env.SERVER_ADDR, gas: 1000000 })
    .then((res: any) => console.log(res));
}

export { testFunction };
