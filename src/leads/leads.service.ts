import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
  ) {}
  create(createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadRepository.save(createLeadDto);
  }

  findAll(): Promise<Lead[]> {
    return this.leadRepository.find();
  }

  findOne(id: number): Promise<Lead | null> {
    return this.leadRepository.findOneBy({ id });
  }

  update(id: number, updateLeadDto: UpdateLeadDto): Promise<UpdateResult> {
    return this.leadRepository.update(id, updateLeadDto);
  }

  remove(id: number) {
    return this.leadRepository.update(id, { deleted_at: new Date() });
  }
}
