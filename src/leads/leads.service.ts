import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { City } from '../cities/entities/city.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { EventType } from 'src/event-types/entities/event-type.entity';
import { MailTemplates, MailSubjects } from 'src/utils/mail-templates';
import * as path from 'path';
@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
    private readonly mailService: MailService,
    @Inject(forwardRef(() => StripeService))
    private readonly stripeService: StripeService,
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
    @InjectRepository(EventType)
    private readonly eventTypeRepository: Repository<EventType>,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<any> {
    // Check for FKs
    const eventType = await this.eventTypeRepository.findOne({
      where: { id: createLeadDto.event_type_id },
    });
    if (!eventType) {
      throw new NotFoundException('Event type not found');
    }
    const pickupCity = await this.cityRepository.findOne({
      where: { id: createLeadDto.pickup_city_id },
      relations: ['state'],
    });
    const dropCity = await this.cityRepository.findOne({
      where: { id: createLeadDto.drop_city_id },
      relations: ['state'],
    });
    if (!pickupCity || !dropCity) {
      throw new NotFoundException('City not found');
    }
    if (!createLeadDto.duration_hours || createLeadDto.duration_hours < 5) {
      throw new BadRequestException('Duration must be at least 5 hours');
    }
    if (createLeadDto.duration_hours > 10) {
      throw new BadRequestException('Duration must be less than 10 hours');
    }
    const lead = this.leadRepository.create(createLeadDto);
    const savedLead = await this.leadRepository.save(lead);
    const imagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentATrolley_Icon_White_Red.png',
    );
    const paymentLink = await this.stripeService.createPaymentLink(
      eventType.stripe_price_id,
      savedLead.duration_hours,
      savedLead.uuid,
    );
    await this.mailService.sendEmail(
      savedLead.email,
      MailSubjects.WELCOME,
      'This is a test email',
      MailTemplates.WELCOME,
      {
        name: `${savedLead.first_name} ${savedLead.last_name}`,
        pickup_city_name: pickupCity?.name,
        drop_city_name: dropCity?.name,
        pickup_city_state_name: pickupCity?.state?.name,
        drop_city_state_name: dropCity?.state?.name,
        pickup_date_time: new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(new Date(savedLead.pickup_date_time)),
        payment_link: paymentLink,
      },
      [
        {
          filename: 'RentATrolley_Icon_Black_Red.png',
          path: imagePath,
          cid: 'logo@cid',
        },
      ],
    );

    // Return lead with city names
    return {
      ...savedLead,
      pickup_city_name: pickupCity?.name,
      drop_city_name: dropCity?.name,
    };
  }

  findAll(): Promise<Lead[]> {
    return this.leadRepository.find();
  }

  async findOne(id: number): Promise<Lead | null> {
    const lead = await this.leadRepository.findOneBy({ id });
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    return lead;
  }
  async findByColumn(column: string, value: string): Promise<Lead | null> {
    return this.leadRepository.findOneBy({ [column]: value });
  }
  async update(
    id: number,
    updateLeadDto: UpdateLeadDto,
  ): Promise<UpdateResult> {
    const lead = await this.findOne(id);
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    return this.leadRepository.update(id, updateLeadDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const lead = await this.findOne(id);
    if (!lead) {
      throw new NotFoundException('Lead not found');
    }
    return this.leadRepository.softDelete(id);
  }
}
