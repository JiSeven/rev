import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { DomainEventPublisher } from './application/ports/domain-event-publisher.port';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { CatalogPort } from './domain/ports/catalog.port';
import { EventEmitter2DomainEventPublisher } from './infrastructure/adapters/driven/eventemitter2-domain-event-publisher.adapter';
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
      provide: DomainEventPublisher,
      useClass: EventEmitter2DomainEventPublisher,
    },
  ],
})
export class CatalogModule {}
