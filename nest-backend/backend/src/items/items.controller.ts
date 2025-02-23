import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  create(@Body() data: { name: string; price: number; quantity: number }) {
    return this.itemsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() data: { name?: string; price?: number; quantity?: number }
  ) {
    return this.itemsService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delete(Number(id));
  }
}
