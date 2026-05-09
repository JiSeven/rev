import { DomainEvent } from '@/catalog/domain/events/domain-event.base';

export abstract class EventPublisher {
  abstract publishAll(events: DomainEvent[]): Promise<void>;
}
