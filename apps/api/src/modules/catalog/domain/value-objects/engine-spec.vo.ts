/**
 * Engine specification for a motorcycle.
 * Power is in kW (not HP — SI unit, avoids hp vs bhp ambiguity).
 * Torque is in Nm.
 */
export interface EngineSpecProps {
  displacementCc: number;
  cylinders: number;
  powerKw: number;
  torqueNm: number;
  configuration: string; // e.g. 'inline-4', 'V-twin', 'boxer', 'single'
}

const CONFIGURATIONS = [
  'single',
  'parallel-twin',
  'V-twin',
  'inline-3',
  'inline-4',
  'V4',
  'boxer',
  'inline-6',
] as const;
export type EngineConfiguration = (typeof CONFIGURATIONS)[number];

export class EngineSpec {
  public readonly displacementCc: number;
  public readonly cylinders: number;
  public readonly powerKw: number;
  public readonly torqueNm: number;
  public readonly configuration: string;

  private constructor(props: EngineSpecProps) {
    this.displacementCc = props.displacementCc;
    this.cylinders = props.cylinders;
    this.powerKw = props.powerKw;
    this.torqueNm = props.torqueNm;
    this.configuration = props.configuration;
  }

  public static create(props: EngineSpecProps): EngineSpec {
    if (props.displacementCc < 50 || props.displacementCc > 2500) {
      throw new Error(
        `Displacement must be between 50cc and 2500cc, received: ${props.displacementCc}cc`,
      );
    }
    if (
      !Number.isInteger(props.cylinders) ||
      props.cylinders < 1 ||
      props.cylinders > 8
    ) {
      throw new Error(
        `Cylinders must be between 1 and 8, received: ${props.cylinders}`,
      );
    }
    if (props.powerKw <= 0) {
      throw new Error(`Power must be positive, received: ${props.powerKw}kW`);
    }
    if (props.torqueNm <= 0) {
      throw new Error(`Torque must be positive, received: ${props.torqueNm}Nm`);
    }
    if (!props.configuration.trim()) {
      throw new Error('Engine configuration cannot be blank');
    }

    return new EngineSpec(props);
  }

  public static reconstitute(props: EngineSpecProps): EngineSpec {
    return new EngineSpec(props);
  }

  /**
   * Returns the minimum EU licence category required based on displacement.
   * A2 additional check (power ≤ 35kW) is enforced at the entity level
   * since it requires both displacement and power together.
   */
  public requiredCategory(): 'A1' | 'A2' | 'A' {
    if (this.displacementCc <= 125 && this.powerKw <= 11) return 'A1';
    if (this.powerKw <= 35) return 'A2';
    return 'A';
  }

  public toPlain(): EngineSpecProps {
    return {
      displacementCc: this.displacementCc,
      cylinders: this.cylinders,
      powerKw: this.powerKw,
      torqueNm: this.torqueNm,
      configuration: this.configuration,
    };
  }
}
