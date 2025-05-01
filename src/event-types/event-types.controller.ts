import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event type' })
  @ApiTags('EventTypes')
  create(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypesService.create(createEventTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all event types' })
  @ApiTags('EventTypes')
  findAll() {
    return this.eventTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event type by ID' })
  @ApiTags('EventTypes')
  findOne(@Param('id') id: string) {
    return this.eventTypesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event type by ID' })
  @ApiTags('EventTypes')
  update(
    @Param('id') id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    return this.eventTypesService.update(+id, updateEventTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event type by ID' })
  @ApiTags('EventTypes')
  remove(@Param('id') id: string) {
    return this.eventTypesService.remove(+id);
  }
}
