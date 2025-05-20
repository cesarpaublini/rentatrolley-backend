import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Repository, UpdateResult } from 'typeorm';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const country = await this.countryRepository.findOneBy({
      name: createCountryDto.name,
    });
    if (country) {
      throw new ConflictException('Country already exists');
    }
    return this.countryRepository.save(createCountryDto);
  }

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  async findOne(id: number): Promise<Country | null> {
    const country = await this.countryRepository.findOneBy({ id });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  async update(
    id: number,
    updateCountryDto: UpdateCountryDto,
  ): Promise<UpdateResult> {
    const country = await this.countryRepository.findOneBy({ id });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return this.countryRepository.update(id, updateCountryDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.countryRepository.update(id, { deleted_at: new Date() });
  }
}
