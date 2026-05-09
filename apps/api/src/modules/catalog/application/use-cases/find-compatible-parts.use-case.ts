import { Injectable } from '@nestjs/common';

import { CursorPage } from '@/shared/types/cursor-page.interface';

import { PartEntity } from '../../domain/entities/part.entity';
import { CatalogPort } from '../../domain/ports/catalog.port';

export class FindCompatiblePartsQuery {
  constructor(
    public readonly make: string,
    public readonly model: string,
    public readonly year: number,
    public readonly limit: number,
    public readonly cursor?: string,
  ) {}
}

@Injectable()
export class FindCompatiblePartsUseCase {
  constructor(private readonly catalogPort: CatalogPort) {}

  async execute(
    query: FindCompatiblePartsQuery,
  ): Promise<CursorPage<PartEntity>> {
    return this.catalogPort.findCompatibleParts(
      query.make,
      query.model,
      query.year,
      query.limit,
      query.cursor,
    );
  }
}
