import { Module } from '@nestjs/common';
import { CitiesDetailsService } from './cities-details.service';
import { CitiesDetailsController } from './cities-details.controller';
import { CitiesDetail } from './entities/cities-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from 'src/cities/cities.module';
@Module({
  imports: [TypeOrmModule.forFeature([CitiesDetail]), CitiesModule],
  controllers: [CitiesDetailsController],
  providers: [CitiesDetailsService],
  exports: [CitiesDetailsService],
})
export class CitiesDetailsModule {}
