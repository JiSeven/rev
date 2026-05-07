import { Module } from '@nestjs/common';
import { CatalogModule } from './modules/catalog/catalog.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, CatalogModule],
  controllers: [],
})
export class AppModule {}
