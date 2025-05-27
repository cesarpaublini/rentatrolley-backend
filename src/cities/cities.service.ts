import { Injectable, NotFoundException } from '@nestjs/common';
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
  async create(createCityDto: CreateCityDto) {
    const stateExists = await this.cityRepository.manager.findOne('states', {
      where: { id: createCityDto.state_id },
    });
    if (!stateExists) {
      throw new NotFoundException('State does not exist');
    }
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
      return { id: rest.id, name: rest.name, slug: rest.slug, state };
    });
  }

  async findOne(id: number): Promise<City | null> {
    const city = await this.cityRepository.findOneBy({ id });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }
  async findOneBySlug(slug: string): Promise<City | null> {
    const city = await this.cityRepository.findOneBy({ slug });
    if (!city) {
      throw new NotFoundException(`City with slug ${slug} not found`);
    }
    return city;
  }
  async update(
    id: number,
    updateCityDto: UpdateCityDto,
  ): Promise<UpdateResult> {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return this.cityRepository.update(id, updateCityDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return this.cityRepository.softDelete(id);
  }
}
