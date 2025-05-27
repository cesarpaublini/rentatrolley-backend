import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCitiesDetailDto } from './dto/create-cities-detail.dto';
import { UpdateCitiesDetailDto } from './dto/update-cities-detail.dto';
import { CitiesDetail } from './entities/cities-detail.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesDetailsService {
  constructor(
    @InjectRepository(CitiesDetail)
    private citiesDetailsRepository: Repository<CitiesDetail>,
  ) {}
  async create(createCitiesDetailDto: CreateCitiesDetailDto) {
    const citiesDetail = this.citiesDetailsRepository.create(
      createCitiesDetailDto,
    );
    if (!citiesDetail) {
      throw new BadRequestException('Unable to create city detail');
    }
    return this.citiesDetailsRepository.save(citiesDetail);
  }

  async findAll(): Promise<CitiesDetail[] | null> {
    const citiesDetails = await this.citiesDetailsRepository.find();
    if (!citiesDetails) {
      throw new NotFoundException('Unable to find city details');
    }
    return citiesDetails;
  }

  async findOne(id: number): Promise<CitiesDetail | null> {
    const citiesDetail = await this.citiesDetailsRepository.findOneBy({ id });
    if (!citiesDetail) {
      throw new NotFoundException('Unable to find city detail');
    }
    return citiesDetail;
  }
  async update(
    id: number,
    updateCitiesDetailDto: UpdateCitiesDetailDto,
  ): Promise<UpdateResult> {
    const citiesDetail = await this.citiesDetailsRepository.findOneBy({ id });
    if (!citiesDetail) {
      throw new NotFoundException('Unable to find city detail');
    }
    return this.citiesDetailsRepository.update(id, updateCitiesDetailDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const citiesDetail = await this.citiesDetailsRepository.findOneBy({ id });
    if (!citiesDetail) {
      throw new NotFoundException('Unable to find city detail');
    }
    return this.citiesDetailsRepository.softDelete(id);
  }
}
