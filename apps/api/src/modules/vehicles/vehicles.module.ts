import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { FindVehiclesUseCase } from './use-cases/find-vehicles.use-case';
import { VehiclesController } from './vehicles.controller';

@Module({
  providers: [PrismaService, FindVehiclesUseCase],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
