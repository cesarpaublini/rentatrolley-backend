import { Injectable } from '@nestjs/common';
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

  create(createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryRepository.save(createCountryDto);
  }

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  findOne(id: number): Promise<Country | null> {
    return this.countryRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateCountryDto: UpdateCountryDto,
  ): Promise<UpdateResult> {
    return this.countryRepository.update(id, updateCountryDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.countryRepository.update(id, { deleted_at: new Date() });
  }
}
