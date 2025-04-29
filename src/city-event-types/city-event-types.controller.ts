import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityEventTypesService } from './city-event-types.service';
import { CreateCityEventTypeDto } from './dto/create-city-event-type.dto';
import { UpdateCityEventTypeDto } from './dto/update-city-event-type.dto';

@Controller('city-event-types')
export class CityEventTypesController {
  constructor(private readonly cityEventTypesService: CityEventTypesService) {}

  @Post()
  create(@Body() createCityEventTypeDto: CreateCityEventTypeDto) {
    return this.cityEventTypesService.create(createCityEventTypeDto);
  }

  @Get()
  findAll() {
    return this.cityEventTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityEventTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityEventTypeDto: UpdateCityEventTypeDto) {
    return this.cityEventTypesService.update(+id, updateCityEventTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityEventTypesService.remove(+id);
  }
}
