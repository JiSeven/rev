import { MotorcycleEntity } from '../entities/motorcycle.entity';

export abstract class CatalogPort {
  // ─── Motorcycles ─────────────────────────────────────────────────────────────

  abstract saveMotorcycle(
    motorcycle: MotorcycleEntity,
  ): Promise<MotorcycleEntity>;

  abstract findMotorcycleById(id: string): Promise<MotorcycleEntity | null>;
  abstract findAllMotorcycles(): Promise<MotorcycleEntity[]>;
}
