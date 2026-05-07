import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CatalogRepositoryPort } from './domain/ports/ catalog.repository.port';
import { ProductEntity } from './domain/entities/product.entity';

@Injectable()
export class CatalogService {
  constructor(private readonly repository: CatalogRepositoryPort) {}

  async findOne(id: string) {
    const product = await this.repository.findById(id);

    if (!product) throw new NotFoundException('Not found');

    return product;
  }

  async findAll() {
    return this.repository.findAll();
  }

  async create(dto: CreateProductDto) {
    return this.repository.save(dto);
  }
}
