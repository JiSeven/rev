import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { VehicleEntity } from '@/vehiclesdomain/entities/vehicle.entity';
import { VehiclesPort } from '@/vehiclesdomain/ports/vehicles.port';

@Injectable()
export class PrismaVehiclesAdapter implements VehiclesPort {
  constructor(private readonly prisma: PrismaService) {}

  async findVehicles(): Promise<VehicleEntity[]> {
    const vehicles = await this.prisma.vehicle.findMany();

    return vehicles.map((vehicle) =>
      VehicleEntity.reconstitute({
        id: vehicle.id,
        vin: vehicle.vin,
        plateNumber: vehicle.plateNumber,
        year: vehicle.year,
        isAvailable: vehicle.isAvailable,
        fuelLevel: vehicle.fuelLevel,
        latitude: vehicle.latitude.toNumber(),
        longitude: vehicle.longitude.toNumber(),
      }),
    );
  }
}
