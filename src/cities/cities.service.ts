import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}
  create(createCityDto: CreateCityDto) {
    return this.cityRepository.save(createCityDto);
  }

  async findAll(): Promise<Partial<City>[]> {
    const cities = await this.cityRepository.find({
      relations: ['state'],
      select: {
        state: {
          name: true,
          abbreviation: true,
        },
      },
    });
    return cities.map((city) => {
      const { state, ...rest } = city;
      return { id: rest.id, name: rest.name, state };
    });
  }

  findOne(id: number): Promise<City | null> {
    return this.cityRepository.findOneBy({ id });
  }

  update(id: number, updateCityDto: UpdateCityDto): Promise<UpdateResult> {
    return this.cityRepository.update(id, updateCityDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.cityRepository.delete(id);
  }
}
