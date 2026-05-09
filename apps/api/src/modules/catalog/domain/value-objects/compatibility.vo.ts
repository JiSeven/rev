export interface CompatibilityProps {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
}

const MIN_YEAR = 1900;

export class Compatibility {
  public readonly make: string;
  public readonly model: string;
  public readonly yearFrom: number;
  public readonly yearTo: number;

  private constructor(props: CompatibilityProps) {
    this.make = props.make;
    this.model = props.model;
    this.yearFrom = props.yearFrom;
    this.yearTo = props.yearTo;
  }

  public static create(props: CompatibilityProps): Compatibility {
    const currentYear = new Date().getFullYear();

    if (!props.make.trim()) {
      throw new Error('Compatibility make cannot be blank');
    }
    if (!props.model.trim()) {
      throw new Error('Compatibility model cannot be blank');
    }
    if (!Number.isInteger(props.yearFrom) || props.yearFrom < MIN_YEAR) {
      throw new Error(
        `yearFrom must be a valid year >= ${MIN_YEAR}, received: ${props.yearFrom}`,
      );
    }
    if (!Number.isInteger(props.yearTo) || props.yearTo > currentYear + 1) {
      throw new Error(
        `yearTo cannot be in the future, received: ${props.yearTo}`,
      );
    }
    if (props.yearFrom > props.yearTo) {
      throw new Error(
        `yearFrom (${props.yearFrom}) cannot be after yearTo (${props.yearTo})`,
      );
    }

    return new Compatibility({
      make: props.make.trim(),
      model: props.model.trim(),
      yearFrom: props.yearFrom,
      yearTo: props.yearTo,
    });
  }

  public static reconstitute(props: CompatibilityProps): Compatibility {
    return new Compatibility(props);
  }

  public fitsBike(make: string, model: string, year: number): boolean {
    return (
      this.make.toLowerCase() === make.toLowerCase().trim() &&
      this.model.toLowerCase() === model.toLowerCase().trim() &&
      year >= this.yearFrom &&
      year <= this.yearTo
    );
  }

  public toPlain(): CompatibilityProps {
    return {
      make: this.make,
      model: this.model,
      yearFrom: this.yearFrom,
      yearTo: this.yearTo,
    };
  }
}
