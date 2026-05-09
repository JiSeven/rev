import { Injectable } from '@nestjs/common';

import { PartEntity } from '../../domain/entities/part.entity';
import { CatalogPort } from '../../domain/ports/catalog.port';
import { Compatibility } from '../../domain/value-objects/compatibility.vo';
import { Money } from '../../domain/value-objects/money.vo';
import { CreatePartCommand } from '../commands/create-part.command';
import { EventPublisher } from '../ports/event-publisher.port';

@Injectable()
export class CreatePartUseCase {
  constructor(
    private readonly catalogPort: CatalogPort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreatePartCommand): Promise<PartEntity> {
    const price = Money.of(command.priceAmount, command.priceCurrency);
    const compatibilities = command.compatibilities.map((c) =>
      Compatibility.create(c),
    );

    const part = PartEntity.create({
      name: command.name,
      description: command.description,
      make: command.make,
      model: command.model,
      year: command.year,
      price,
      partCategory: command.partCategory,
      compatibilities,
      oemPartNumber: command.oemPartNumber,
    });

    const events = part.pullDomainEvents();
    await this.catalogPort.savePart(part);
    await this.publisher.publishAll(events);

    return part;
  }
}
