import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { FindVehiclesUseCase } from './application/use-cases/find-vehicles.use-case';
import { VehiclesPort } from './domain/ports/vehicles.port';
import { PrismaVehiclesAdapter } from './infrastructure/adapters/driven/prisma-vehicles.adapter';
import { VehiclesHttpAdapter } from './infrastructure/adapters/driving/http/vehicles.http.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [VehiclesHttpAdapter],
  providers: [
    FindVehiclesUseCase,
    {
      provide: VehiclesPort,
      useClass: PrismaVehiclesAdapter,
    },
  ],
})
export class VehiclesModule {}
