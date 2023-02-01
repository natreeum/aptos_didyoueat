import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CollectionController } from './controllers/collection.controller';
import { ItemController } from './controllers/item.controller';
import { OwnerController } from './controllers/owner.controller';
import { UserController } from './controllers/user.controller';
import { CollectionService } from './services/collection.service';
import { ItemService } from './services/item.service';
import { OwnerService } from './services/owner.service';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { key } from 'src/auth/secretKey';

@Module({
  controllers: [
    CollectionController,
    ItemController,
    OwnerController,
    UserController,
  ],
  providers: [
    CollectionService,
    ItemService,
    OwnerService,
    UserService,
    JwtStrategy,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: key,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
})
export class ApiModule {}
