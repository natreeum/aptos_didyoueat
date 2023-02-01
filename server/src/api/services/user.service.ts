import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { userUtils } from 'prisma/scripts/user';
import { user } from '../dto/user.dto';

@Injectable()
export class UserService {
  async getUser(wallet_address: string, res: Response) {
    if (!wallet_address)
      return res.status(400).send({ status: 'failed', message: 'Bad Request' });
    const userData = await userUtils.getUserData(wallet_address);
    const userTokens = await userUtils.getTokensByWallet(wallet_address);
    return res
      .status(200)
      .send({ status: 'success', message: { userData, userTokens } });
  }

  async changeUserNick(body: user, res: Response) {
    if (Object.keys(body).length != 2 || !body.nickname || !body.wallet_address)
      throw new BadRequestException();

    const changeRes = await userUtils.changeNick(body);
    if (!changeRes)
      return res
        .status(200)
        .send({ status: 'failed', message: `user doesn't exist on db` });
    return res.send({ status: 'success', message: changeRes });
  }
}
