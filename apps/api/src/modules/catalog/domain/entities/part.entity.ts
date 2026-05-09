import { randomUUID } from 'crypto';

import { BaseEntity } from './base.entity';
import { CatalogItemType } from '../enums/catalog-item-type.enum';
import { PartCategory } from '../enums/part-category.enum';
import { CatalogItemCreatedEvent } from '../events/catalog-item-created.event';
import { Compatibility } from '../value-objects/compatibility.vo';
import { Money } from '../value-objects/money.vo';

export interface PartProps {
  id: string;
  name: string;
  description: string;
  make: string;
  model: string;
  year: number;
  price: Money;
  partCategory: PartCategory;
  compatibilities: Compatibility[];
  oemPartNumber?: string;
  createdAt: Date;
}

export type CreatePartProps = Omit<PartProps, 'id' | 'createdAt'>;

export class PartEntity extends BaseEntity {
  private constructor(private readonly props: PartProps) {
    super();
  }

  // ─── Factories ───────────────────────────────────────────────────────────────

  public static create(props: CreatePartProps): PartEntity {
    PartEntity.validate(props);

    const entity = new PartEntity({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
    });

    entity.addDomainEvent(
      new CatalogItemCreatedEvent(
        entity.props.id,
        props.name,
        CatalogItemType.PART,
        props.price.currency,
        props.price.amount,
      ),
    );

    return entity;
  }

  public static reconstitute(props: PartProps): PartEntity {
    return new PartEntity(props);
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
  get partCategory(): PartCategory {
    return this.props.partCategory;
  }
  get compatibilities(): Compatibility[] {
    return [...this.props.compatibilities];
  }
  get oemPartNumber(): string | undefined {
    return this.props.oemPartNumber;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get type(): CatalogItemType.PART {
    return CatalogItemType.PART;
  }

  // ─── Domain behaviour ────────────────────────────────────────────────────────

  public isCompatibleWith(make: string, model: string, year: number): boolean {
    return this.props.compatibilities.some((c) =>
      c.fitsBike(make, model, year),
    );
  }

  // ─── Validation ──────────────────────────────────────────────────────────────

  private static validate(props: CreatePartProps): void {
    if (!props.make.trim()) {
      throw new Error('Make cannot be blank');
    }
    if (!props.model.trim()) {
      throw new Error('Model cannot be blank');
    }
    if (props.compatibilities.length === 0) {
      throw new Error('A part must declare at least one compatibility');
    }
    if (props.oemPartNumber !== undefined && !props.oemPartNumber.trim()) {
      throw new Error('OEM part number cannot be blank if provided');
    }
  }
}
