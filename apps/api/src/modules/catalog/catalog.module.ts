import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { EventPublisher } from './application/ports/event-publisher.port';
import { CreateProductUseCase } from './application/use-cases/create-motorcycle.use-case';
import { CatalogPort } from './domain/ports/catalog.port';
import { EventEmitter2EventPublisher } from './infrastructure/adapters/driven/eventemitter2-event-publisher.adapter';
import { PrismaCatalogAdapter } from './infrastructure/adapters/driven/prisma-catalog.adapter';
import { CatalogHttpAdapter } from './infrastructure/adapters/driving/http/catalog.http.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [CatalogHttpAdapter],
  providers: [
    CreateProductUseCase,
    {
      provide: CatalogPort,
      useClass: PrismaCatalogAdapter,
    },
    {
      provide: EventPublisher,
      useClass: EventEmitter2EventPublisher,
    },
  ],
})
export class CatalogModule {}
