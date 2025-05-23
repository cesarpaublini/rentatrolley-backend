import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { StripeService } from 'src/stripe/stripe.service';
import { EventType } from 'src/event-types/entities/event-type.entity';
import {
  MailTemplates,
  MailSubjects,
  MailTexts,
} from 'src/utils/mail-templates';
import * as path from 'path';
import { City } from 'src/cities/entities/city.entity';
type LeadType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  event_type_id: number;
  vehicle_type: string;
  event_city_id: number;
  pickup_location: string;
  drop_location: string;
  pickup_date: Date;
  pickup_time: string;
  duration_hours: number;
  passenger_count: number;
  special_requirements: string;
  trolley_amount: number;
};

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
    private readonly mailService: MailService,
    @Inject(forwardRef(() => StripeService))
    private readonly stripeService: StripeService,
    @InjectRepository(EventType)
    private readonly eventTypeRepository: Repository<EventType>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async create(createLeadDto: LeadType): Promise<any> {
    // Check for FKs
    const eventType = await this.eventTypeRepository.findOne({
      where: { id: createLeadDto.event_type_id },
    });
    if (!eventType) {
      throw new NotFoundException('Event type not found');
    }
    const city = await this.cityRepository.findOne({
      where: { id: createLeadDto.event_city_id },
    });
    if (!city) {
      throw new NotFoundException('Event city not found');
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
    const whiteTrolleyExteriorImagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentAtrolley-exterior-3.png',
    );
    const whiteTrolleyInteriorImagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentAtrolley-interior-3.png',
    );

    const greenTanTrolleyExteriorImagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentAtrolley-ex-2.png',
    );
    const greenTanTrolleyInteriorImagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentAtrolley-in-2.png',
    );
    const redTrolleyExteriorImagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentAtrolley-exterior-4.png',
    );
    const redTrolleyInteriorImagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentAtrolley-interior-4.png',
    );
    const paymentLink = await this.stripeService.createPaymentLink(
      eventType.stripe_price_id,
      savedLead.duration_hours,
      savedLead.trolley_amount,
      savedLead.uuid,
    );
    const formattedPickupDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(savedLead.pickup_date));

    const formattedPickupTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date(`1970-01-01T${savedLead.pickup_time}:00`));

    await this.mailService.sendEmail(
      savedLead.email,
      MailSubjects.WELCOME,
      MailTexts.WELCOME,
      MailTemplates.WELCOME,
      {
        name: `${savedLead.first_name} ${savedLead.last_name}`,
        city: savedLead.event_city?.name,
        pickup_location: savedLead.pickup_location,
        drop_location: savedLead.drop_location,
        pickup_date: formattedPickupDate,
        pickup_time: formattedPickupTime,
        payment_link: paymentLink,
      },
      [
        {
          filename: 'RentATrolley_Icon_Black_Red.png',
          path: imagePath,
          cid: 'logo@cid',
        },
        {
          filename: 'RentAtrolley-exterior-3.png',
          path: whiteTrolleyExteriorImagePath,
          cid: 'whiteTrolley@cid',
        },
        {
          filename: 'RentAtrolley-interior-3.png',
          path: whiteTrolleyInteriorImagePath,
          cid: 'whiteTrolleyInterior@cid',
        },
        {
          filename: 'RentAtrolley-exterior-2.png',
          path: greenTanTrolleyExteriorImagePath,
          cid: 'greenTanTrolley@cid',
        },
        {
          filename: 'RentAtrolley-interior-2.png',
          path: greenTanTrolleyInteriorImagePath,
          cid: 'greenTanTrolleyInterior@cid',
        },
        {
          filename: 'RentAtrolley-exterior-4.png',
          path: redTrolleyExteriorImagePath,
          cid: 'redTrolley@cid',
        },
        {
          filename: 'RentAtrolley-interior-4.png',
          path: redTrolleyInteriorImagePath,
          cid: 'redTrolleyInterior@cid',
        },
      ],
    );
    await this.mailService.sendEmail(
      'reservations@rumbatoursmiami.com',
      MailSubjects.NEW_LEAD,
      MailTexts.NEW_LEAD,
      MailTemplates.NEW_LEAD,
      {
        first_name: savedLead.first_name,
        last_name: savedLead.last_name,
        email: savedLead.email,
        phone_number: savedLead.phone_number,
        event_type: eventType.name,
        pickup_location: savedLead.pickup_location,
        drop_location: savedLead.drop_location,
        pickup_date: formattedPickupDate,
        pickup_time: formattedPickupTime,
        special_requirements: savedLead.special_requirements,
      },
    );
    return savedLead;
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
