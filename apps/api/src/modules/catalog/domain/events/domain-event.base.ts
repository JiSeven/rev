export abstract class DomainEvent {
  abstract readonly name: string;
  public readonly occurredAt: Date = new Date();
}
