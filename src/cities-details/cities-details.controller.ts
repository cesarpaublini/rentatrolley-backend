import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CitiesDetailsService } from './cities-details.service';
import { CreateCitiesDetailDto } from './dto/create-cities-detail.dto';
import { UpdateCitiesDetailDto } from './dto/update-cities-detail.dto';
import { CitiesService } from 'src/cities/cities.service';
@Controller('cities-details')
export class CitiesDetailsController {
  constructor(
    private readonly citiesDetailsService: CitiesDetailsService,
    private readonly citiesService: CitiesService,
  ) {}

  @Post()
  create(@Body() createCitiesDetailDto: CreateCitiesDetailDto) {
    return this.citiesDetailsService.create(createCitiesDetailDto);
  }

  @Get()
  findAll() {
    return this.citiesDetailsService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const citySlug = await this.citiesService.findOneBySlug(slug);
    if (!citySlug) {
      throw new NotFoundException('City not found for the given slug');
    }
    return this.citiesDetailsService.findOne(citySlug.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCitiesDetailDto: UpdateCitiesDetailDto,
  ) {
    return this.citiesDetailsService.update(+id, updateCitiesDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citiesDetailsService.remove(+id);
  }
}
