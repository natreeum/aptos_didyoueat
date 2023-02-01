import { Injectable } from '@nestjs/common';
import { authUtils } from 'prisma/scripts/auth';
import { Response } from 'express';
import { ownerSignDto } from 'src/api/dto/ownerSign.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnerAuthService {
  constructor(private jwtService: JwtService) {}
  async signUp(body: ownerSignDto, res: Response): Promise<Response> {
    if (Object.keys(body).length !== 2)
      return res.status(400).send({ status: 'failed', message: 'Bad Request' });
    const ownerCreateRes = await authUtils.ownerSignUp(body.id, body.password);

    if (ownerCreateRes === null)
      return res.status(200).send({ status: 'failed', message: 'exist id' });
    if (ownerCreateRes)
      return res.status(201).send({
        status: 'success',
        message: `${ownerCreateRes.owner_id} created`,
      });
  }

  async signIn(body: ownerSignDto, res: Response): Promise<Response> {
    if (Object.keys(body).length !== 2 || !body.id || !body.password)
      return res.status(400).send({ status: 'failed', message: 'Bad Request' });
    const ownerData = await authUtils.getOwner(body.id);
    if (ownerData === null)
      return res
        .status(401)
        .send({ status: 'failed', message: 'No matching owner' });
    if (ownerData.owner_pw === body.password) {
      // 유저토큰 생성
      const payload = { userId: body.id, role: 'owner' };
      const accessToken = this.jwtService.sign(payload);
      return res
        .status(200)
        .send({ status: 'success', message: { accessToken } });
    } else
      return res
        .status(401)
        .send({ status: 'failed', message: 'signIn failed' });
  }
}
