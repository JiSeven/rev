import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseDto } from './dto/product-response.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.prisma.client.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.mapToDto(product);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.prisma.client.product.findMany();

    return products.map((product) => this.mapToDto(product));
  }

  async create(dto: CreateProductDto) {
    return this.prisma.client.product.create({
      data: {
        name: dto.name,
        brand: dto.brand,
        type: dto.type,
        price: dto.price,
        description: dto.description,
        scentProfile: dto.scentProfile,
      },
    });
  }

  private mapToDto(product: any): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      type: product.type,
      price: product.price,
      description: product.description,
      scentProfile: product.scentProfile as any,
    };
  }
}
