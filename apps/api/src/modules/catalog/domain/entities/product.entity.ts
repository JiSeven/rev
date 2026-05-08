import { randomUUID } from 'node:crypto';

import { ProductType } from '../enums/product-type';
import { DomainEvent } from '../events/domain-event.base';
import { ProductCreatedEvent } from '../events/product-created.event';
import { Money } from '../value-objects/money.vo';
import { ScentProfile } from '../value-objects/scent-profile.vo';

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  brand: string;
  type: ProductType;
  price: Money;
  scentProfile: ScentProfile;
  createdAt: Date;
}

type CreateProductProps = Omit<ProductProps, 'id' | 'createdAt'>;

export class ProductEntity {
  private readonly _domainEvents: DomainEvent[] = [];

  private constructor(private readonly props: ProductProps) {}

  // ─── Factory: brand-new product, generates ID and emits domain event ────────

  public static create(props: CreateProductProps): ProductEntity {
    const entity = new ProductEntity({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
    });

    entity._domainEvents.push(
      new ProductCreatedEvent(
        entity.props.id,
        props.name,
        props.type,
        props.price.currency,
        props.price.amount,
      ),
    );

    return entity;
  }

  // ─── Factory: rehydrate from persistence, no events emitted ─────────────────

  public static reconstitute(props: ProductProps): ProductEntity {
    return new ProductEntity(props);
  }

  // ─── Identity & basic props ──────────────────────────────────────────────────

  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get description(): string {
    return this.props.description;
  }
  get brand(): string {
    return this.props.brand;
  }
  get type(): ProductType {
    return this.props.type;
  }
  get price(): Money {
    return this.props.price;
  }
  get scentProfile(): ScentProfile {
    return this.props.scentProfile;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  // ─── Domain behaviour ────────────────────────────────────────────────────────

  public hasNote(note: string): boolean {
    return this.props.scentProfile.hasNote(note);
  }

  // ─── Domain events ───────────────────────────────────────────────────────────

  /**
   * Pull accumulated domain events and clear the internal list.
   */
  public pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents.length = 0;
    return events;
  }
}
