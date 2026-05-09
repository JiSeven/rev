import { Injectable } from '@nestjs/common';

import { MotorcycleEntity } from '@/catalog/domain/entities/motorcycle.entity';
import { CatalogItemAlreadyExistsException } from '@/catalog/domain/exceptions/catalog-item.exceptions';
import { CatalogPort } from '@/catalog/domain/ports/catalog.port';
import { Motorcycle, Prisma } from '@/prisma/generated/client';
import { PrismaService } from '@/prisma/prisma.service';
import { Money } from '@/catalog/domain/value-objects/money.vo';
import {
  EngineSpec,
  EngineSpecProps,
} from '@/catalog/domain/value-objects/engine-spec.vo';

@Injectable()
export class PrismaCatalogAdapter extends CatalogPort {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  // ─── Motorcycles ─────────────────────────────────────────────────────────────
  async saveMotorcycle(entity: MotorcycleEntity): Promise<MotorcycleEntity> {
    try {
      const record = await this.prisma.motorcycle.create({
        data: {
          id: entity.id,
          name: entity.name,
          description: entity.description,
          make: entity.make,
          model: entity.model,
          year: entity.year,
          priceAmount: entity.price.amount,
          priceCurrency: entity.price.currency,
          engineSpec:
            entity.engineSpec.toPlain() as unknown as Prisma.InputJsonValue,
          createdAt: entity.createdAt,
        },
      });

      return this.motorcycleToDomain(record);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new CatalogItemAlreadyExistsException(
          entity.make,
          entity.model,
          entity.year,
        );
      }
      throw error;
    }
  }

  // ─── Mapping ─────────────────────────────────────────────────────────────────
  private motorcycleToDomain(record: Motorcycle): MotorcycleEntity {
    return MotorcycleEntity.reconstitute({
      id: record.id,
      name: record.name,
      description: record.description,
      make: record.make,
      model: record.model,
      year: record.year,
      price: Money.of(record.priceAmount, record.priceCurrency),
      engineSpec: EngineSpec.reconstitute(
        record.engineSpec as unknown as EngineSpecProps,
      ),
      createdAt: record.createdAt,
    });
  }
}
