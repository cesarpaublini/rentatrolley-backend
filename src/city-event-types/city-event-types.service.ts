import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

  async create(createCityEventTypeDto: CreateCityEventTypeDto) {
    const cityEventType = await this.cityEventTypeRepository.findOneBy({
      city_id: createCityEventTypeDto.city_id,
      event_type_id: createCityEventTypeDto.event_type_id,
    });
    if (cityEventType) {
      throw new ConflictException('City event type already exists');
    }
    return this.cityEventTypeRepository.save(createCityEventTypeDto);
  }
  findAll(): Promise<CityEventType[]> {
    return this.cityEventTypeRepository.find();
  }

  async findOne(id: number): Promise<CityEventType | null> {
    const cityEventType = await this.cityEventTypeRepository.findOneBy({ id });
    if (!cityEventType) {
      throw new NotFoundException(`City event type with ID ${id} not found`);
    }
    return cityEventType;
  }

  async update(
    id: number,
    updateCityEventTypeDto: UpdateCityEventTypeDto,
  ): Promise<UpdateResult> {
    const cityEventType = await this.findOne(id);
    if (!cityEventType) {
      throw new NotFoundException(`City event type with ID ${id} not found`);
    }
    return this.cityEventTypeRepository.update(id, updateCityEventTypeDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const cityEventType = await this.findOne(id);
    if (!cityEventType) {
      throw new NotFoundException(`City event type with ID ${id} not found`);
    }
    return this.cityEventTypeRepository.softDelete(id);
  }
}
