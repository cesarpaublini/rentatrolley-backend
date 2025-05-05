import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { City } from './entities/city.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new city' })
  @ApiTags('Cities')
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiTags('Cities')
  findAll(): Promise<Partial<City>[]> {
    return this.citiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a city by ID' })
  @ApiTags('Cities')
  findOne(@Param('id') id: string): Promise<City | null> {
    return this.citiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a city by ID' })
  @ApiTags('Cities')
  update(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<UpdateResult> {
    return this.citiesService.update(+id, updateCityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a city by ID' })
  @ApiTags('Cities')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.citiesService.remove(+id);
  }
}
