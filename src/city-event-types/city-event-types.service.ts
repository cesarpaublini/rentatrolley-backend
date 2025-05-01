import { Injectable } from '@nestjs/common';
import { CreateCityEventTypeDto } from './dto/create-city-event-type.dto';
import { UpdateCityEventTypeDto } from './dto/update-city-event-type.dto';
import { CityEventType } from './entities/city-event-type.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CityEventTypesService {
  constructor(
    @InjectRepository(CityEventType)
    private cityEventTypeRepository: Repository<CityEventType>,
  ) {}

  create(createCityEventTypeDto: CreateCityEventTypeDto) {
    return this.cityEventTypeRepository.save(createCityEventTypeDto);
  }

  findAll(): Promise<CityEventType[]> {
    return this.cityEventTypeRepository.find();
  }

  findOne(id: number): Promise<CityEventType | null> {
    return this.cityEventTypeRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateCityEventTypeDto: UpdateCityEventTypeDto,
  ): Promise<UpdateResult> {
    return this.cityEventTypeRepository.update(id, updateCityEventTypeDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.cityEventTypeRepository.delete(id);
  }
}
