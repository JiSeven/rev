import { Controller, Get, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.catalogService.findOne(id);
  }

  @Get()
  getAllProducts() {
    return this.catalogService.findAll();
  }
}
