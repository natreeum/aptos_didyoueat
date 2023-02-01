import path from 'path';
import dotenv from 'dotenv';
// import Caver, { AbiItem } from 'caver-js';
import ipfsClient from 'ipfs-http-client';

const ROOT_DIR = path.join(__dirname, '..');
dotenv.config({ path: `${ROOT_DIR}/.env` });

const { IPFS_PROJECT_ID, IPFS_SECRET_KEY } = process.env;

// const testMeta = {
//   collection_id: 'test',
//   img_url: 'https://test.url',
//   coordinate_x: 36,
//   coordinate_y: 48,
//   owner_id: 'owner2',
//   shop_name: 'fire',
//   event: 'good event',
// };

async function uploadIpfs(meta) {
  const auth = `Basic ${Buffer.from(
    `${IPFS_PROJECT_ID}:${IPFS_SECRET_KEY}`,
  ).toString('base64')}`;

  const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const cid = await client.add(JSON.stringify(meta));
  return cid.path;
}

export { uploadIpfs };
