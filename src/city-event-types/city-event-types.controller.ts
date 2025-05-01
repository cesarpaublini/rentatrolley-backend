import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CityEventTypesService } from './city-event-types.service';
import { CreateCityEventTypeDto } from './dto/create-city-event-type.dto';
import { UpdateCityEventTypeDto } from './dto/update-city-event-type.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('city-event-types')
export class CityEventTypesController {
  constructor(private readonly cityEventTypesService: CityEventTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new city event type' })
  @ApiTags('CityEventTypes')
  create(@Body() createCityEventTypeDto: CreateCityEventTypeDto) {
    return this.cityEventTypesService.create(createCityEventTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all city event types' })
  @ApiTags('CityEventTypes')
  findAll() {
    return this.cityEventTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a city event type by ID' })
  @ApiTags('CityEventTypes')
  findOne(@Param('id') id: string) {
    return this.cityEventTypesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a city event type by ID' })
  @ApiTags('CityEventTypes')
  update(
    @Param('id') id: string,
    @Body() updateCityEventTypeDto: UpdateCityEventTypeDto,
  ) {
    return this.cityEventTypesService.update(+id, updateCityEventTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a city event type by ID' })
  @ApiTags('CityEventTypes')
  remove(@Param('id') id: string) {
    return this.cityEventTypesService.remove(+id);
  }
}
