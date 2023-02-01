import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { userSign } from 'src/api/dto/userSign.dto';
import axios from 'axios';

@Injectable()
export class UserAuthService {
  constructor(private jwtService: JwtService) {}
  // Bad Request
  async signIn(body: userSign, res: Response) {
    if (
      Object.keys(body).length !== 2 ||
      !body.private_key ||
      !body.wallet_address
    )
      return res.status(400).send({ status: 'failed', message: 'Bad Request' });

    // validate request_key
    const validationRes = await axios.get(
      `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${body.private_key}`,
    );
    // if validated
    if (validationRes.data.result) {
      const payload = { walletAddress: body.wallet_address, role: 'user' };
      const accessToken = this.jwtService.sign(payload);
      return res
        .status(200)
        .send({ status: 'success', message: { accessToken } });
    }

    // if time out
    else if (validationRes.status === 400) {
      return res.status(401).send({
        status: 'failed',
        message: 'request time out',
      });
    }

    // if not validated
    else {
      return res.status(401).send({ status: 'failed', message: 'try again' });
    }
  }
}
