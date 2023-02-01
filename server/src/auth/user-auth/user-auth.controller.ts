import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { userSign } from 'src/api/dto/userSign.dto';
import { UserAuthService } from './user-auth.service';

@Controller('/api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}
  @Post('/user/signin')
  signIn(@Body() body: userSign, @Res() res: Response) {
    this.userAuthService.signIn(body, res);
  }
}
