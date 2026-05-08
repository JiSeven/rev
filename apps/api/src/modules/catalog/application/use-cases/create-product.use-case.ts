import { Injectable } from '@nestjs/common';

import { ProductEntity } from '@/catalog/domain/entities/product.entity';
import { CatalogPort } from '@/catalog/domain/ports/catalog.port';
import { Money } from '@/catalog/domain/value-objects/money.vo';
import { ScentProfile } from '@/catalog/domain/value-objects/scent-profile.vo';

import { CreateProductCommand } from '../commands/create-product.command';
import { DomainEventPublisher } from '../ports/domain-event-publisher.port';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly catalogPort: CatalogPort,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const price = Money.of(command.priceAmount, command.priceCurrency);
    const scentProfile = ScentProfile.create(command.scentProfile);

    const product = ProductEntity.create({
      name: command.name,
      description: command.description,
      brand: command.brand,
      type: command.type,
      price,
      scentProfile,
    });

    const events = product.pullDomainEvents();

    const saved = await this.catalogPort.save(product);

    await this.eventPublisher.publishAll(events);

    return saved;
  }
}
