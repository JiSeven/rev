import { DomainEvent } from './domain-event.base';
import { CatalogItemType } from '../enums/catalog-item-type.enum';

export class CatalogItemCreatedEvent extends DomainEvent {
  readonly eventName = 'CatalogItemCreatedEvent';

  constructor(
    public readonly itemId: string,
    public readonly itemName: string,
    public readonly itemType: CatalogItemType,
    public readonly priceCurrency: string,
    public readonly priceAmount: number,
  ) {
    super();
  }
}
