import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { CatalogHttpAdapter } from './infrastructure/adapters/driving/http/catalog.http.adapter';
import { CreateMotorcycleUseCase } from './application/use-cases/create-motorcycle.use-case';
import { CatalogPort } from './domain/ports/catalog.port';
import { InMemoryCatalogAdapter } from './infrastructure/adapters/driven/in-memory-catalog.adapter';
import { GetMotorcycleUseCase } from './application/use-cases/get-motorcycle.use-case';
import { GetAllMotorcyclesUseCase } from './application/use-cases/get-motorcycles.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [CatalogHttpAdapter],
  providers: [
    CreateMotorcycleUseCase,
    GetMotorcycleUseCase,
    GetAllMotorcyclesUseCase,
    {
      provide: CatalogPort,
      useClass: InMemoryCatalogAdapter,
    },
  ],
})
export class CatalogModule {}
