import { randomUUID } from 'node:crypto';
import { CatalogItemType } from '../enums/catalog-item-type.enum';
import { EngineSpec } from '../value-objects/engine-spec.vo';
import { Money } from '../value-objects/money.vo';
import { BaseEntity } from './base.entity';
import { CatalogItemCreatedEvent } from '../events/catalog-item-created.event';

export interface MotorcycleProps {
  id: string;
  name: string;
  description: string;
  make: string;
  model: string;
  year: number;
  price: Money;
  engineSpec: EngineSpec;
  createdAt: Date;
}

export type CreateMotorcycleProps = Omit<MotorcycleProps, 'id' | 'createdAt'>;

export class MotorcycleEntity extends BaseEntity {
  private constructor(private readonly props: MotorcycleProps) {
    super();
  }

  // ─── Factories ───────────────────────────────────────────────────────────────

  public static create(props: CreateMotorcycleProps): MotorcycleEntity {
    MotorcycleEntity.validate(props);

    const entity = new MotorcycleEntity({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
    });

    entity.addDomainEvent(
      new CatalogItemCreatedEvent(
        entity.props.id,
        props.name,
        CatalogItemType.MOTORCYCLE,
        props.price.currency,
        props.price.amount,
      ),
    );

    return entity;
  }

  public static reconstitute(props: MotorcycleProps): MotorcycleEntity {
    return new MotorcycleEntity(props);
  }

  // ─── Getters ─────────────────────────────────────────────────────────────────

  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get description(): string {
    return this.props.description;
  }
  get make(): string {
    return this.props.make;
  }
  get model(): string {
    return this.props.model;
  }
  get year(): number {
    return this.props.year;
  }
  get price(): Money {
    return this.props.price;
  }
  get engineSpec(): EngineSpec {
    return this.props.engineSpec;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get type(): CatalogItemType.MOTORCYCLE {
    return CatalogItemType.MOTORCYCLE;
  }

  // ─── Domain behaviour ────────────────────────────────────────────────────────

  public requiredLicenceCategory(): 'A1' | 'A2' | 'A' {
    return this.props.engineSpec.requiredCategory();
  }

  // ─── Validation ──────────────────────────────────────────────────────────────

  private static validate(props: CreateMotorcycleProps): void {
    const currentYear = new Date().getFullYear();

    if (!props.make.trim()) {
      throw new Error('Make cannot be blank');
    }

    if (!props.model.trim()) {
      throw new Error('Model cannot be blank');
    }

    if (
      !Number.isInteger(props.year) ||
      props.year < 1900 ||
      props.year > currentYear + 1
    ) {
      throw new Error(
        `Year must be between 1900 and ${currentYear + 1}, received: ${props.year}`,
      );
    }
  }
}
