import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { getEvents } from 'prisma/scripts/collection/getEvents';
import { collectionUtils } from 'prisma/scripts/collection';
import { collection } from 'src/api/dto/collection.dto';
import { event } from 'src/api/dto/event.dto';
import { uploadIpfs } from 'chainUtils/ipfs';
import { chainUtils } from 'chainUtils/scripts';
import { poapEmitter } from 'chainUtils/eventHandler';
import { createCurDate } from 'src/utils/date';
import { v4 } from 'uuid';
import { DbSync } from 'src/utils/dbSync';

import path from 'path';
import dotenv from 'dotenv';

const ROOT_DIR = path.join(__dirname, '../../..');
dotenv.config({ path: `${ROOT_DIR}/.env` });

@Injectable()
export class CollectionService {
  async getCollection(collection_id: string, res: Response) {
    const collectionData = await collectionUtils.getCollectionData(
      collection_id,
    );
    if (collectionData === null) {
      return res.status(200).send({
        status: 'failed',
        message: 'no matching collection',
      });
    }
    return res.status(200).send({ status: 'success', message: collectionData });
  }

  async createCollection(body: collection, res: Response) {
    const { IPFS_BASE_URL } = process.env;

    // 400 Bad Request
    const {
      img_url,
      location,
      coordinate_x,
      coordinate_y,
      owner_id,
      shop_name,
    } = body;
    if (
      !img_url ||
      !location ||
      !coordinate_x ||
      !coordinate_y ||
      !owner_id ||
      !shop_name ||
      !(Object.keys(body).length == 6)
    ) {
      return res.status(400).send({ status: 'failed', message: 'Bad Request' });
    }

    //created_at
    const created_at: string = createCurDate();

    //uuid
    const collection_id = v4();

    const newCollection = {
      collection_id,
      img_url,
      location,
      created_at,
      coordinate_x,
      coordinate_y,
      owner_id,
      shop_name,
    };

    //ipfs upload
    const CID = await uploadIpfs(newCollection);
    const uri = `${IPFS_BASE_URL}/${CID}`;

    //sync db listener
    const sync: DbSync = new DbSync('createCollection', poapEmitter);
    sync.setEmitter();

    //make transaction
    const result = await chainUtils.createCollection(
      collection_id,
      owner_id,
      uri,
    );

    //if collection_id is already exist
    if (result === null) {
      return res
        .status(200)
        .send({ status: 'failed', message: `${collection_id} already exist` });
    }

    //sync db
    const status = await sync.run();
    // console.log(status);

    //if db error
    if (!status) {
      return res
        .status(500)
        .send({ status: 'fail', message: 'internal server error' });
    }

    //get collectiondata
    const collectionData = await collectionUtils.getCollectionData(
      collection_id,
    );

    return res.status(201).send({ status: 'success', message: collectionData });
  }

  async updateCollection(
    collection_id: string,
    body: collection,
    res: Response,
  ) {
    // 400 Bad Request
    const { IPFS_BASE_URL } = process.env;

    const {
      img_url,
      location,
      coordinate_x,
      coordinate_y,
      owner_id,
      shop_name,
    } = body;
    if (
      !img_url ||
      !location ||
      !coordinate_x ||
      !coordinate_y ||
      !owner_id ||
      !shop_name ||
      !(Object.keys(body).length == 6)
    ) {
      return res.status(400).send({ status: 'failed', message: 'Bad Request' });
    }

    //created_at
    const created_at: string = createCurDate();

    const newCollection = {
      collection_id,
      img_url,
      location,
      created_at,
      coordinate_x,
      coordinate_y,
      owner_id,
      shop_name,
    };

    //ipfs upload
    const CID = await uploadIpfs(newCollection);
    const uri = `${IPFS_BASE_URL}/${CID}`;

    //sync db listener
    const sync: DbSync = new DbSync('updateCollection', poapEmitter);
    sync.setEmitter();

    const result = await chainUtils.updateCollection(collection_id, uri);

    //if collection_id is already exist
    if (result === null) {
      return res
        .status(200)
        .send({ status: 'failed', message: `${collection_id} not found` });
    }

    //sync db
    const status = await sync.run();
    // console.log(status);

    //if db error
    if (!status) {
      return res
        .status(500)
        .send({ status: 'fail', message: 'internal server error' });
    }

    //get collectiondata
    const collectionData = await collectionUtils.getCollectionData(
      collection_id,
    );

    return res.status(201).send({ status: 'success', message: collectionData });
  }

  async newEvent(body: event, res: Response) {
    // 400 Bad Request
    const { collection_id, content } = body;
    if (Object.keys(body).length != 2 || !collection_id || !content)
      return res.status(400).send({ status: 'failed', message: 'Bad Request' });

    const collectionData = await collectionUtils.getCollectionData(
      collection_id,
    );
    if (collectionData === null)
      return res
        .status(200)
        .send({ status: 'failed', message: 'no matching collection' });

    await collectionUtils.createEvent(body);
    const updatedCollectionData = await collectionUtils.getCollectionData(
      collection_id,
    );
    const events = await getEvents(collection_id);
    return res.status(201).send({
      status: 'success',
      message: { collection: updatedCollectionData, events },
    });
  }
}
