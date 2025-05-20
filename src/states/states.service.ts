import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async create(createStateDto: CreateStateDto) {
    const stateExists = await this.stateRepository.manager.findOne('states', {
      where: { name: createStateDto.name },
    });
    if (stateExists) {
      throw new ConflictException('State already exists');
    }

    try {
      return await this.stateRepository.save(createStateDto);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.detail) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new ConflictException(error.detail);
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  findAll(): Promise<State[]> {
    return this.stateRepository.find();
  }

  async findOne(id: number): Promise<State | null> {
    const state = await this.stateRepository.findOneBy({ id });
    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
    return state;
  }

  async update(
    id: number,
    updateStateDto: UpdateStateDto,
  ): Promise<UpdateResult> {
    const state = await this.stateRepository.findOneBy({ id });
    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
    return this.stateRepository.update(id, updateStateDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.stateRepository.delete(id);
  }
}
