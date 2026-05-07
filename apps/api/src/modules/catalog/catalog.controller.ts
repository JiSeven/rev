import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';
import {
  type CreateProductDto,
  CreateProductSchema,
} from './dto/create-product.dto';

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

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  create(@Body() createProductDto: CreateProductDto) {
    return this.catalogService.create(createProductDto);
  }
}
