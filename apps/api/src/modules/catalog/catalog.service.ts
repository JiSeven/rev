import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const product = await this.prisma.client.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async findAll() {
    return this.prisma.client.product.findMany();
  }
}
