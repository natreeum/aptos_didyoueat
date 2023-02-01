import { Body, Controller, Get, Param, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { user } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch('changenick')
  changeNick(@Body() body: user, @Res() res: Response): object {
    return this.userService.changeUserNick(body, res);
  }

  @Get(':wallet_address')
  getUser(
    @Param('wallet_address') walletAddres: string,
    @Res() res: Response,
  ): object {
    return this.userService.getUser(walletAddres, res);
  }

  @Get(':wallet_address/tokens')
  getUserTokens(): object {
    return {};
  }
}
