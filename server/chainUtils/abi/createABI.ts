import * as fs from 'fs';

const fsPromise = fs.promises;

fsPromise
  .readFile('../json/MyNFTs.json', 'utf-8')
  .then((data) => JSON.parse(data))
  .then((data) => {
    // console.log(data.abi);
    fsPromise
      .writeFile(
        './MyTokenAbi.ts',
        `export const tokenAbi=${JSON.stringify(data.abi)}`,
      )
      .then(() => {
        console.log('token complete');
      })
      .catch((err) => console.error(err));
  });

fsPromise
  .readFile('../json/Poap.json', 'utf-8')
  .then((data) => JSON.parse(data))
  .then((data) => {
    // console.log(data.abi);
    fsPromise
      .writeFile(
        './PoapAbi.ts',
        `export const poapAbi=${JSON.stringify(data.abi)}`,
      )
      .then(() => {
        console.log('poap complete');
      })
      .catch((err) => console.error(err));
  });
