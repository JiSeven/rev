/**
 * Engine displacement in cubic centimetres (cc).
 * Used both for motorcycles (engine size) and parts (engine compatibility).
 *
 * A1 licence covers up to 125cc.
 * A2 licence covers up to ~500cc in practice.
 * Smallest production engine ~50cc (mopeds), largest ~2500cc (Boss Hoss).
 */
const MIN_CC = 50;
const MAX_CC = 2500;

export class Displacement {
  private constructor(public readonly cc: number) {}

  public static of(cc: number): Displacement {
    if (!Number.isInteger(cc)) {
      throw new Error(
        `Displacement must be a whole number of cc, received: ${cc}`,
      );
    }
    if (cc < MIN_CC || cc > MAX_CC) {
      throw new Error(
        `Displacement must be between ${MIN_CC}cc and ${MAX_CC}cc, received: ${cc}cc`,
      );
    }
    return new Displacement(cc);
  }

  public static reconstitute(cc: number): Displacement {
    return new Displacement(cc);
  }

  /**
   * Returns the minimum EU licence category required to ride
   * a motorcycle with this displacement.
   */
  public requiredLicenceCategory(): 'A1' | 'A2' | 'A' {
    if (this.cc <= 125) return 'A1';
    if (this.cc <= 500) return 'A2';
    return 'A';
  }

  public equals(other: Displacement): boolean {
    return this.cc === other.cc;
  }

  public toString(): string {
    return `${this.cc}cc`;
  }
}
