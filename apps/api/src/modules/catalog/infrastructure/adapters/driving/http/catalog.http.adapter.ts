import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateProductCommand } from '@/catalog/application/commands/create-motorcycle.command';
import { CreateProductUseCase } from '@/catalog/application/use-cases/create-motorcycle.use-case';

import { type CreateProductDto } from './dto/create-motorcycle.dto';
import {
  ProductResponseDto,
  toProductResponseDto,
} from './dto/catalog-response.dto';

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
