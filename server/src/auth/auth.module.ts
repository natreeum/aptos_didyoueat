import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { OwnerAuthController } from './owner-auth/owner-auth.controller';
import { OwnerAuthService } from './owner-auth/owner-auth.service';
import { key } from './secretKey';
import { UserAuthController } from './user-auth/user-auth.controller';
import { UserAuthService } from './user-auth/user-auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: key,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [OwnerAuthService, JwtStrategy, UserAuthService],
  controllers: [OwnerAuthController, UserAuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
