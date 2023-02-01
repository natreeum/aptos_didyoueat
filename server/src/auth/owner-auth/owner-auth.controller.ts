import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OwnerAuthService } from './owner-auth.service';
import { Response } from 'express';
import { ownerSignDto } from 'src/api/dto/ownerSign.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth')
export class OwnerAuthController {
  constructor(private readonly authServices: OwnerAuthService) {}
  @Get('/test')
  @UseGuards(AuthGuard())
  main(@Req() req) {
    return 'good';
  }

  @Post('owner/signup')
  signUp(@Body() body: ownerSignDto, @Res() res: Response): object {
    return this.authServices.signUp(body, res);
  }

  @Post('owner/signin')
  signIn(@Body() body: ownerSignDto, @Res() res: Response): object {
    return this.authServices.signIn(body, res);
  }
}
