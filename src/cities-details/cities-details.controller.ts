import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitiesDetailsService } from './cities-details.service';
import { CreateCitiesDetailDto } from './dto/create-cities-detail.dto';
import { UpdateCitiesDetailDto } from './dto/update-cities-detail.dto';

@Controller('cities-details')
export class CitiesDetailsController {
  constructor(private readonly citiesDetailsService: CitiesDetailsService) {}

  @Post()
  create(@Body() createCitiesDetailDto: CreateCitiesDetailDto) {
    return this.citiesDetailsService.create(createCitiesDetailDto);
  }

  @Get()
  findAll() {
    return this.citiesDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitiesDetailDto: UpdateCitiesDetailDto) {
    return this.citiesDetailsService.update(+id, updateCitiesDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citiesDetailsService.remove(+id);
  }
}
