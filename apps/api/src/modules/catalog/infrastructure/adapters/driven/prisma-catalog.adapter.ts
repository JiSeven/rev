import { Injectable } from '@nestjs/common';
import {
  InputJsonValue,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/client';

import { ProductEntity } from '@/catalog/domain/entities/product.entity';
import { ProductType } from '@/catalog/domain/enums/product-type';
import { ProductAlreadyExistsException } from '@/catalog/domain/exceptions/product-already-exists.exception';
import { CatalogPort } from '@/catalog/domain/ports/catalog.port';
import { Money } from '@/catalog/domain/value-objects/money.vo';
import {
  ScentProfile,
  ScentProfileProps,
} from '@/catalog/domain/value-objects/scent-profile.vo';
import { Product } from '@/prisma/generated/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PrismaCatalogAdapter extends CatalogPort {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(entity: ProductEntity): Promise<ProductEntity> {
    try {
      const record = await this.prisma.product.create({
        data: {
          id: entity.id,
          name: entity.name,
          description: entity.description,
          brand: entity.brand,
          type: entity.type,
          priceAmount: entity.price.amount,
          priceCurrency: entity.price.currency,
          scentProfile:
            entity.scentProfile.toPlain() as unknown as InputJsonValue,
          createdAt: entity.createdAt,
        },
      });

      return this.toDomain(record);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ProductAlreadyExistsException(entity.name);
      }

      throw error;
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany();

    return products.map((p) => this.toDomain(p));
  }

  private toDomain(record: Product): ProductEntity {
    const scentProfileData =
      record.scentProfile as unknown as ScentProfileProps;

    return ProductEntity.reconstitute({
      id: record.id,
      name: record.name,
      description: record.description,
      brand: record.brand,
      type: record.type as ProductType,
      price: Money.of(record.priceAmount, record.priceCurrency),
      scentProfile: ScentProfile.create(scentProfileData),
      createdAt: record.createdAt,
    });
  }
}
