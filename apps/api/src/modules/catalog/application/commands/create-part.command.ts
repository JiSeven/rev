import { PartCategory } from '../../domain/enums/part-category.enum';
import { CompatibilityProps } from '../../domain/value-objects/compatibility.vo';

export class CreatePartCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly make: string,
    public readonly model: string,
    public readonly year: number,
    public readonly priceAmount: number,
    public readonly priceCurrency: string,
    public readonly partCategory: PartCategory,
    public readonly compatibilities: CompatibilityProps[],
    public readonly oemPartNumber?: string,
  ) {}
}
