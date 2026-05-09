import { EngineSpecProps } from '../../domain/value-objects/engine-spec.vo';

export class CreateMotorcycleCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly make: string,
    public readonly model: string,
    public readonly year: number,
    public readonly priceAmount: number,
    public readonly priceCurrency: string,
    public readonly engineSpec: EngineSpecProps,
  ) {}
}
