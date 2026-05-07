import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CatalogRepositoryPort } from './domain/ports/ catalog.repository.port';

@Injectable()
export class CatalogService {
  constructor(private readonly repository: CatalogRepositoryPort) {}

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.repository.findById(id);

    if (!product) throw new NotFoundException('Not found');

    return product;
  }

  async findAll(): Promise<ProductResponseDto[]> {
    return this.repository.findAll();
  }

  async create(dto: CreateProductDto): Promise<ProductResponseDto> {
    return this.repository.save(dto);
  }
}
