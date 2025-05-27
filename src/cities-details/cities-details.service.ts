import { Injectable } from '@nestjs/common';
import { CreateCitiesDetailDto } from './dto/create-cities-detail.dto';
import { UpdateCitiesDetailDto } from './dto/update-cities-detail.dto';

@Injectable()
export class CitiesDetailsService {
  create(createCitiesDetailDto: CreateCitiesDetailDto) {
    return 'This action adds a new citiesDetail';
  }

  findAll() {
    return `This action returns all citiesDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} citiesDetail`;
  }

  update(id: number, updateCitiesDetailDto: UpdateCitiesDetailDto) {
    return `This action updates a #${id} citiesDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} citiesDetail`;
  }
}
