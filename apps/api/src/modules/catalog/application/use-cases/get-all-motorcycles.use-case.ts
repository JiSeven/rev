import { Injectable } from '@nestjs/common';

import { CursorPage } from '@/shared/types/cursor-page.interface';

import { MotorcycleEntity } from '../../domain/entities/motorcycle.entity';
import { CatalogPort } from '../../domain/ports/catalog.port';

@Injectable()
export class GetAllMotorcyclesUseCase {
  constructor(private readonly catalogPort: CatalogPort) {}

  async execute(
    limit: number,
    cursor?: string,
  ): Promise<CursorPage<MotorcycleEntity>> {
    return this.catalogPort.findAllMotorcycles(limit, cursor);
  }
}
