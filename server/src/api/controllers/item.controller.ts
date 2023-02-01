import { Controller, Get, Post } from '@nestjs/common';
import { ItemService } from '../services/item.service';

@Controller('api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getAll(): object {
    return {};
  }

  @Get(':token_id')
  getItem(): object {
    return {};
  }

  @Post('mint')
  mint(): object {
    return {};
  }
}
