import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OwnerService } from '../services/owner.service';
import { Response } from 'express';
import { ownerSignDto } from '../dto/ownerSign.dto';

@Controller('/api/owners')
@UseGuards(AuthGuard())
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}
  @Get()
  ownerMain(): string {
    return 'owner';
  }

  @Get('test')
  ownerTest() {
    return 'OwnerTest';
  }

  @Get(':owner_id/collections')
  getOwnerCollections(
    @Param('owner_id') owner_id: string,
    @Res() res: Response,
  ) {
    return this.ownerService.getOwnerCollections(owner_id, res);
  }

  @Patch('changepw')
  changePW(@Body() body: ownerSignDto, @Res() res: Response): object {
    return this.ownerService.changePW(body, res);
  }
}
