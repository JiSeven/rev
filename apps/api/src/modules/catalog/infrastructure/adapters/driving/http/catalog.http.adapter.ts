import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateProductCommand } from '@/catalog/application/commands/create-product.command';
import { CreateProductUseCase } from '@/catalog/application/use-cases/create-product.use-case';

import { type CreateProductDto } from './dto/create-product.dto';
import {
  ProductResponseDto,
  toProductResponseDto,
} from './dto/product-response.dto';

@Controller('catalog')
export class CatalogHttpAdapter {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    const command = new CreateProductCommand(
      dto.name,
      dto.description,
      dto.brand,
      dto.type,
      dto.price.amount,
      dto.price.currency,
      dto.scentProfile,
    );

    const product = await this.createProductUseCase.execute(command);

    return toProductResponseDto(product);
  }
}
