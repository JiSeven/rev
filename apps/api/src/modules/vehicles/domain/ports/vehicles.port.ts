import { VehicleEntity } from '../entities/vehicle.entity';

export abstract class VehiclesPort {
  abstract findVehicles(): Promise<VehicleEntity[]>;
}
