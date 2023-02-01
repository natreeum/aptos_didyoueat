import { collectionUtils } from '../prisma/scripts/collection';
import fetch from 'node-fetch';
import EventEmitter from 'events';

const poapEmitter: EventEmitter = new EventEmitter();

const url2json = async (url: string) => {
  try {
    const res = await (await fetch(url)).json();
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const poapEventHandler = {
  createCollection: async (e: any) => {
    const result = await url2json(e.returnValues.metaURI);

    const {
      collection_id,
      img_url,
      location,
      created_at,
      coordinate_x,
      coordinate_y,
      owner_id,
      shop_name,
    } = result;

    const newCollection = await collectionUtils.createCollection({
      collection_id,
      img_url,
      location,
      created_at,
      coordinate_x,
      coordinate_y,
      owner_id,
      shop_name,
    });

    if (!newCollection) poapEmitter.emit('createCollection', false);
    poapEmitter.emit('createCollection', true);
  },

  updateCollection: async (e: any) => {
    const result = await url2json(e.returnValues.newMetaURI);

    const {
      collection_id,
      img_url,
      location,
      created_at,
      coordinate_x,
      coordinate_y,
      owner_id,
      shop_name,
    } = result;

    const updatedCollection = await collectionUtils.updateCollection({
      collection_id,
      img_url,
      location,
      created_at,
      coordinate_x,
      coordinate_y,
      owner_id,
      shop_name,
    });

    if (!updatedCollection) poapEmitter.emit('updateCollection', false);
    poapEmitter.emit('updateCollection', true);
  },
};

const eventHandler = {
  poapEventHandler,
};

export { eventHandler, poapEmitter };
