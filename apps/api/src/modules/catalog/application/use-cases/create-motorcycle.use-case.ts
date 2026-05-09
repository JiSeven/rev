import { Injectable } from '@nestjs/common';

import { MotorcycleEntity } from '@/catalog/domain/entities/motorcycle.entity';
import { CatalogPort } from '@/catalog/domain/ports/catalog.port';
import { EngineSpec } from '@/catalog/domain/value-objects/engine-spec.vo';
import { Money } from '@/catalog/domain/value-objects/money.vo';

import { CreateMotorcycleCommand } from '../commands/create-motorcycle.command';
import { EventPublisher } from '../ports/event-publisher.port';

@Injectable()
export class CreateMotorcycleUseCase {
  constructor(
    private readonly catalogPort: CatalogPort,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateMotorcycleCommand): Promise<MotorcycleEntity> {
    const price = Money.of(command.priceAmount, command.priceCurrency);
    const engineSpec = EngineSpec.create(command.engineSpec);

    const motorcycle = MotorcycleEntity.create({
      name: command.name,
      description: command.description,
      make: command.make,
      model: command.model,
      year: command.year,
      price,
      engineSpec,
    });

    const events = motorcycle.pullDomainEvents();
    await this.catalogPort.saveMotorcycle(motorcycle);

    await this.eventPublisher.publishAll(events);

    return motorcycle;
  }
}
