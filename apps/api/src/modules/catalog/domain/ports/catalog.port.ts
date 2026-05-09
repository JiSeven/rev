import { CursorPage } from '@/shared/types/cursor-page.interface';

import { MotorcycleEntity } from '../entities/motorcycle.entity';
import { PartEntity } from '../entities/part.entity';

export abstract class CatalogPort {
  // ─── Motorcycles ─────────────────────────────────────────────────────────────

  abstract saveMotorcycle(
    motorcycle: MotorcycleEntity,
  ): Promise<MotorcycleEntity>;

  abstract findMotorcycleById(id: string): Promise<MotorcycleEntity | null>;

  abstract findAllMotorcycles(
    limit: number,
    cursor?: string,
  ): Promise<CursorPage<MotorcycleEntity>>;

  // ─── Parts ───────────────────────────────────────────────────────────────────

  abstract savePart(part: PartEntity): Promise<PartEntity>;

  abstract findPartById(id: string): Promise<PartEntity | null>;

  abstract findAllParts(
    limit: number,
    cursor?: string,
  ): Promise<CursorPage<PartEntity>>;

  abstract findCompatibleParts(
    make: string,
    model: string,
    year: number,
    limit: number,
    cursor?: string,
  ): Promise<CursorPage<PartEntity>>;
}
