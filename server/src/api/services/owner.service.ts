import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ownerUtils } from 'prisma/scripts/owner';
import { ownerSignDto } from '../dto/ownerSign.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class OwnerService {
  async getOwnerCollections(owner_id: string, res: Response) {
    const collections = await ownerUtils.getCollectionsByOwner(owner_id);

    if (collections === null) {
      return res.status(200).send({
        status: 'failed',
        message: 'no matching owner',
      });
    }

    return res.status(200).send({ status: 'success', message: collections });
  }

  async changePW(body: ownerSignDto, res: Response) {
    if (Object.keys(body).length != 2 || !body.id || !body.password)
      throw new BadRequestException();

    const owner = await ownerUtils.changePW(body);

    if (!owner)
      return res
        .status(200)
        .send({ status: 'failed', message: `no matching owner` });

    return res.send({ status: 'success', message: 'Password changed' });
  }
}
