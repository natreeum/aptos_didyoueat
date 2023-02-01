import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { prisma } from '../../prisma/prisma';
import { key } from './secretKey';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: key,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userId } = payload;
    const owner = await prisma.owner.findUnique({
      where: { owner_id: userId },
    });
    if (!owner) throw new UnauthorizedException();
    return true;
  }
}
