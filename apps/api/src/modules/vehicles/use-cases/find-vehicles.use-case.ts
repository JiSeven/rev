import { Injectable } from '@nestjs/common';
import z from 'zod';

import { PrismaService } from '@/prisma/prisma.service';

import { VehicleSchema } from '../schemas/vehicle.schema';

@Injectable()
export class FindVehiclesUseCase {
  private outputSchema = z.array(VehicleSchema);

  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    const vehicles = await this.prisma.vehicle.findMany({
      include: {
        model: {
          include: {
            brand: true,
          },
        },
      },
    });

    return this.outputSchema.parse(vehicles);
  }
}
