import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { collection } from 'src/api/dto/collection.dto';
import { event } from 'src/api/dto/event.dto';
import { CollectionService } from '../services/collection.service';

@Controller('/api/collections')
@UseGuards(AuthGuard())
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  @Get()
  collectionMain(): string {
    return 'collection';
  }

  @Get(':collection_id')
  getCollection(
    @Param('collection_id') collection_id: string,
    @Res() res: Response,
  ) {
    return this.collectionService.getCollection(collection_id, res);
  }

  @Post('create')
  createCollection(@Body() body: collection, @Res() res: Response): object {
    return this.collectionService.createCollection(body, res);
  }

  @Post('update/:collection_id')
  updateCollection(
    @Param('collection_id') collection_id: string,
    @Body() body: collection,
    @Res() res: Response,
  ): object {
    return this.collectionService.updateCollection(collection_id, body, res);
  }

  @Post('newevent')
  newEvent(@Body() body: event, @Res() res: Response): object {
    return this.collectionService.newEvent(body, res);
  }

  @Patch('delevent')
  delEvent(): object {
    return {};
  }
}
