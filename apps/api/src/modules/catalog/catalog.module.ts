import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { CatalogRepositoryPort } from './domain/ports/ catalog.repository.port';
import { PrismaCatalogRepository } from './infrastructure/persistence/prisma-catalog.repository';

@Module({
  controllers: [CatalogController],
  providers: [
    CatalogService,
    {
      provide: CatalogRepositoryPort,
      useClass: PrismaCatalogRepository,
    },
  ],
})
export class CatalogModule {}
