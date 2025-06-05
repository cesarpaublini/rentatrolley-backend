import { Module } from '@nestjs/common';
import { CityEventTypesService } from './city-event-types.service';
import { CityEventTypesController } from './city-event-types.controller';
import { CityEventType } from './entities/city-event-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CityEventType])],
  controllers: [CityEventTypesController],
  providers: [CityEventTypesService],
})
export class CityEventTypesModule {}
