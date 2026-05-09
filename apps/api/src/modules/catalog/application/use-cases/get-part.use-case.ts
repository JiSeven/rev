import { Injectable } from '@nestjs/common';

import { PartEntity } from '../../domain/entities/part.entity';
import { CatalogItemNotFoundException } from '../../domain/exceptions/catalog-item.exceptions';
import { CatalogPort } from '../../domain/ports/catalog.port';

@Injectable()
export class GetPartUseCase {
  constructor(private readonly catalogPort: CatalogPort) {}

  async execute(id: string): Promise<PartEntity> {
    const part = await this.catalogPort.findPartById(id);

    if (!part) {
      throw new CatalogItemNotFoundException(id);
    }

    return part;
  }
}
