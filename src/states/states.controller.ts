import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new state' })
  @ApiTags('States')
  create(@Body() createStateDto: CreateStateDto) {
    return this.statesService.create(createStateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all states' })
  @ApiTags('States')
  findAll() {
    return this.statesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a state by ID' })
  @ApiTags('States')
  findOne(@Param('id') id: string) {
    return this.statesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a state by ID' })
  @ApiTags('States')
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.statesService.update(+id, updateStateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a state by ID' })
  @ApiTags('States')
  remove(@Param('id') id: string) {
    return this.statesService.remove(+id);
  }
}
