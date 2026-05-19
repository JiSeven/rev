import { randomUUID } from 'node:crypto';

import { BaseEntity } from './base.entity';

export interface VehicleProps {
  id: string;
  vin: string;
  plateNumber: string;
  year: number;
  isAvailable: boolean;
  fuelLevel: number;
  latitude: number;
  longitude: number;
}

export type CreateVehicleProps = Omit<VehicleProps, 'id' | 'createdAt'>;

export class VehicleEntity extends BaseEntity {
  private constructor(private readonly props: VehicleProps) {
    super();
  }

  // ─── Getters ─────────────────────────────────────────────────────────────────
  get id() {
    return this.props.id;
  }

  get vin() {
    return;
  }

  get plateNumber() {
    return this.props.plateNumber;
  }

  get year() {
    return this.props.year;
  }

  get isAvailable() {
    return this.props.isAvailable;
  }

  get fuelLevel() {
    return this.props.fuelLevel;
  }

  get location() {
    return {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    };
  }

  // ─── Factories ───────────────────────────────────────────────────────────────

  public static create(props: CreateVehicleProps): VehicleEntity {
    VehicleEntity.validate(props);

    const entity = new VehicleEntity({
      ...props,
      id: randomUUID(),
    });

    return entity;
  }

  public static reconstitute(props: VehicleProps): VehicleEntity {
    return new VehicleEntity(props);
  }

  // ─── Validation ──────────────────────────────────────────────────────────────

  private static validate(props: CreateVehicleProps): void {
    // TODO: implement validation
  }
}
