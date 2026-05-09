import { Injectable } from '@nestjs/common';

import { MotorcycleEntity } from '../../domain/entities/motorcycle.entity';
import { CatalogItemNotFoundException } from '../../domain/exceptions/catalog-item.exceptions';
import { CatalogPort } from '../../domain/ports/catalog.port';

@Injectable()
export class GetMotorcycleUseCase {
  constructor(private readonly catalogPort: CatalogPort) {}

  async execute(id: string): Promise<MotorcycleEntity> {
    const motorcycle = await this.catalogPort.findMotorcycleById(id);

    if (!motorcycle) {
      throw new CatalogItemNotFoundException(id);
    }

    return motorcycle;
  }
}
