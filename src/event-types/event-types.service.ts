import { Injectable } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { EventType } from './entities/event-type.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventTypesService {
  constructor(
    @InjectRepository(EventType)
    private eventTypeRepository: Repository<EventType>,
  ) {}
  create(createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeRepository.save(createEventTypeDto);
  }

  findAll(): Promise<EventType[]> {
    return this.eventTypeRepository.find();
  }

  findOne(id: number): Promise<EventType | null> {
    return this.eventTypeRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateEventTypeDto: UpdateEventTypeDto,
  ): Promise<UpdateResult> {
    return this.eventTypeRepository.update(id, updateEventTypeDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.eventTypeRepository.delete(id);
  }
}
