// ─── Response ─────────────────────────────────────────────────────────────────

import { VehicleEntity } from '@/vehicles/domain/entities/vehicle.entity';

export function toVehicleResponseDto(entity: VehicleEntity) {
  return {
    id: entity.id,
    vin: entity.vin,
    plateNumber: entity.plateNumber,
    year: entity.year,
    isAvailable: entity.isAvailable,
    fuelLevel: entity.fuelLevel,
    location: entity.location,
  };
}
