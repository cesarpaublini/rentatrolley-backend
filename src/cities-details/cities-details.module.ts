import { Module } from '@nestjs/common';
import { CitiesDetailsService } from './cities-details.service';
import { CitiesDetailsController } from './cities-details.controller';

@Module({
  controllers: [CitiesDetailsController],
  providers: [CitiesDetailsService],
})
export class CitiesDetailsModule {}
