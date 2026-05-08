import { Module } from '@nestjs/common';

import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { CatalogPort } from './domain/ports/catalog.port';
import { PrismaCatalogAdapter } from './infrastructure/adapters/driven/prisma-catalog.adapter';
import { CatalogHttpAdapter } from './infrastructure/adapters/driving/http/catalog.http.adapter';

@Module({
  controllers: [CatalogHttpAdapter],
  providers: [
    CreateProductUseCase,
    {
      provide: CatalogPort,
      useClass: PrismaCatalogAdapter,
    },
  ],
})
export class CatalogModule {}
