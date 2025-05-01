import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  create(createStateDto: CreateStateDto) {
    return this.stateRepository.save(createStateDto);
  }

  findAll(): Promise<State[]> {
    return this.stateRepository.find();
  }

  findOne(id: number): Promise<State | null> {
    return this.stateRepository.findOneBy({ id });
  }

  update(id: number, updateStateDto: UpdateStateDto): Promise<UpdateResult> {
    return this.stateRepository.update(id, updateStateDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.stateRepository.delete(id);
  }
}
