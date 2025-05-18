import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { City } from '../cities/entities/city.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { EventType } from 'src/event-types/entities/event-type.entity';
import { MailTemplates, MailSubjects } from 'src/utils/mail-templates';
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
    const lead = this.leadRepository.create(createLeadDto);
    const savedLead = await this.leadRepository.save(lead);

    // Fetch city names
    const pickupCity = await this.cityRepository.findOne({
      where: { id: savedLead.pickup_city_id },
      relations: ['state'],
    });
    const dropCity = await this.cityRepository.findOne({
      where: { id: savedLead.drop_city_id },
      relations: ['state'],
    });
    const eventType = await this.eventTypeRepository.findOne({
      where: { id: savedLead.event_type_id },
    });
    if (!eventType) {
      throw new Error('Event type not found');
    }
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

  findOne(id: number): Promise<Lead | null> {
    return this.leadRepository.findOneBy({ id });
  }
  async findByColumn(column: string, value: string): Promise<Lead | null> {
    return this.leadRepository.findOneBy({ [column]: value });
  }
  update(id: number, updateLeadDto: UpdateLeadDto): Promise<UpdateResult> {
    return this.leadRepository.update(id, updateLeadDto);
  }

  remove(id: number): Promise<UpdateResult> {
    return this.leadRepository.update(id, { deleted_at: new Date() });
  }
}
