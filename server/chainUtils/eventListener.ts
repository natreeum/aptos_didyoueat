import Caver, { AbiItem } from 'caver-js';
import { tokenAbi } from './abi/MyTokenAbi';
import { poapAbi } from './abi/PoapAbi';
import { eventHandler } from './eventHandler';

const caver = new Caver('wss://public-node-api.klaytnapi.com/v1/baobab/ws');

const testContract = caver.contract.create(
  tokenAbi as AbiItem[],
  process.env.MYTOKEN_CA,
);

const poapContract = caver.contract.create(
  poapAbi as AbiItem[],
  process.env.POAP_CA,
);

const { poapEventHandler } = eventHandler;

const myTokenEventListener = async () => {
  try {
    const defaultOptions = {
      filter: {
        value: [],
      },
      fromBlock: 'latest',
    };

    // console.log(myContract.events.Transfer(options));

    testContract.events
      .Transfer(defaultOptions)
      .on('data', async (event: any) => {
        try {
          console.log('data');
          console.log(event);
        } catch (err) {
          console.error(err);
          return err;
        }
      })
      .on('error', (err: any) => console.log(err));
  } catch (err) {
    console.log(err);
    return err;
  }
};

const poapEventListener = () => {
  const defaultOptions = {
    filter: {
      value: [],
    },
    fromBlock: 'latest',
  };

  poapContract.events
    .CreateCollection(defaultOptions)
    .on('data', (event: any) => {
      poapEventHandler.createCollection(event);
    })
    .on('error', console.error);

  poapContract.events
    .UpdateCollection(defaultOptions)
    .on('data', (event: any) => {
      poapEventHandler.updateCollection(event);
    })
    .on('error', console.error);
};

const eventListener = {
  myTokenEventListener,
  poapEventListener,

  allRun: () => {
    myTokenEventListener();
    poapEventListener();
  },
};

export { eventListener };
