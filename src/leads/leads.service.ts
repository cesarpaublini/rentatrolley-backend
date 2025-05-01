import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
    private readonly mailService: MailService,
  ) {}
  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = this.leadRepository.create(createLeadDto);
    const savedLead = await this.leadRepository.save(lead);
    await this.mailService.sendEmail(
      savedLead.email,
      'Welcome Rent a Trolley',
      'This is a test email',
      {
        name: `${savedLead.first_name} ${savedLead.last_name}`,
      },
    );
    return savedLead;
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

  remove(id: number): Promise<UpdateResult> {
    return this.leadRepository.update(id, { deleted_at: new Date() });
  }
}
