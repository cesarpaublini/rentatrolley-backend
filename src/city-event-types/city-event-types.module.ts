import { Module } from '@nestjs/common';
import { CityEventTypesService } from './city-event-types.service';
import { CityEventTypesController } from './city-event-types.controller';

@Module({
  controllers: [CityEventTypesController],
  providers: [CityEventTypesService],
})
export class CityEventTypesModule {}
