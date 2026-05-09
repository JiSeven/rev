import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { CatalogModule } from './modules/catalog/catalog.module';

@Module({
  imports: [EventEmitterModule.forRoot(), CatalogModule],
  controllers: [],
})
export class AppModule {}
