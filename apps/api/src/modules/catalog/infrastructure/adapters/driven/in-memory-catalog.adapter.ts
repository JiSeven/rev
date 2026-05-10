import { MotorcycleEntity } from '@/catalog/domain/entities/motorcycle.entity';
import { CatalogPort } from '@/catalog/domain/ports/catalog.port';
import { Injectable } from '@nestjs/common';

const SEED: MotorcycleEntity[] = [
  MotorcycleEntity.reconstitute({
    id: 'a1b2c3d4-0001-0000-0000-000000000001',
    name: 'Honda CB750',
    make: 'Honda',
    model: 'CB750',
    year: 2023,
    priceInCents: 899900,
    createdAt: new Date('2024-01-10'),
  }),
  MotorcycleEntity.reconstitute({
    id: 'a1b2c3d4-0002-0000-0000-000000000002',
    name: 'Kawasaki Z900',
    make: 'Kawasaki',
    model: 'Z900',
    year: 2024,
    priceInCents: 1049900,
    createdAt: new Date('2024-02-15'),
  }),
  MotorcycleEntity.reconstitute({
    id: 'a1b2c3d4-0003-0000-0000-000000000003',
    name: 'Yamaha MT-07',
    make: 'Yamaha',
    model: 'MT-07',
    year: 2024,
    priceInCents: 879900,
    createdAt: new Date('2024-03-01'),
  }),
];

@Injectable()
export class InMemoryCatalogAdapter implements CatalogPort {
  private readonly store = new Map<string, MotorcycleEntity>(
    SEED.map((m) => [m.id, m]),
  );

  async saveMotorcycle(
    motorcycle: MotorcycleEntity,
  ): Promise<MotorcycleEntity> {
    this.store.set(motorcycle.id, motorcycle);

    return motorcycle;
  }

  async findMotorcycleById(id: string): Promise<MotorcycleEntity | null> {
    const motorcycle = this.store.get(id);

    return motorcycle ?? null;
  }

  async findAllMotorcycles(): Promise<MotorcycleEntity[]> {
    return [...this.store.values()];
  }
}
