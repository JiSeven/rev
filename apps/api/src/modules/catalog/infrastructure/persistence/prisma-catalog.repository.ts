import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import {
  ProductResponseDto,
  ScentProfileDto,
} from '../../dto/product-response.dto';
import { CatalogRepositoryPort } from '../../domain/ports/ catalog.repository.port';
import { CreateProductDto } from '../../dto/create-product.dto';

@Injectable()
export class PrismaCatalogRepository extends CatalogRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async save(data: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.prismaService.client.product.create({
      data: {
        ...data,
        scentProfile: data.scentProfile,
      },
    });
    return this.mapToDto(product);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.prismaService.client.product.findMany();
    return products.map((p) => this.mapToDto(p));
  }

  async findById(id: string): Promise<ProductResponseDto | null> {
    const product = await this.prismaService.client.product.findUnique({
      where: { id },
    });

    if (!product) return null;
    return this.mapToDto(product);
  }

  private mapToDto(product: any): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      type: product.type,
      price: product.price,
      description: product.description,
      scentProfile: product.scentProfile as ScentProfileDto,
    };
  }
}
