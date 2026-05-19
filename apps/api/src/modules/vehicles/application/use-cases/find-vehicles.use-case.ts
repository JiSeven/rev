import { Injectable } from '@nestjs/common';

import { VehicleEntity } from '../../domain/entities/vehicle.entity';
import { VehiclesPort } from '../../domain/ports/vehicles.port';

@Injectable()
export class FindVehiclesUseCase {
  constructor(private readonly vehiclesPort: VehiclesPort) {}

  async execute(): Promise<VehicleEntity[]> {
    return this.vehiclesPort.findVehicles();
  }
}
