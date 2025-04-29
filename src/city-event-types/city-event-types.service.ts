import { Injectable } from '@nestjs/common';
import { CreateCityEventTypeDto } from './dto/create-city-event-type.dto';
import { UpdateCityEventTypeDto } from './dto/update-city-event-type.dto';

@Injectable()
export class CityEventTypesService {
  create(createCityEventTypeDto: CreateCityEventTypeDto) {
    return 'This action adds a new cityEventType';
  }

  findAll() {
    return `This action returns all cityEventTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cityEventType`;
  }

  update(id: number, updateCityEventTypeDto: UpdateCityEventTypeDto) {
    return `This action updates a #${id} cityEventType`;
  }

  remove(id: number) {
    return `This action removes a #${id} cityEventType`;
  }
}
