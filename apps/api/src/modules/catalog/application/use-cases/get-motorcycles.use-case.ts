import { Injectable } from '@nestjs/common';

import { MotorcycleEntity } from '@/catalog/domain/entities/motorcycle.entity';
import { CatalogPort } from '@/catalog/domain/ports/catalog.port';

@Injectable()
export class GetAllMotorcyclesUseCase {
  constructor(private readonly catalogPort: CatalogPort) {}

  async execute(): Promise<MotorcycleEntity[]> {
    return this.catalogPort.findAllMotorcycles();
  }
}
