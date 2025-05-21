import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { EventType } from './entities/event-type.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StripeService } from 'src/stripe/stripe.service';
@Injectable()
export class EventTypesService {
  constructor(
    @InjectRepository(EventType)
    private eventTypeRepository: Repository<EventType>,
    private readonly stripeService: StripeService,
  ) {}
  async create(createEventTypeDto: CreateEventTypeDto) {
    const eventType = this.eventTypeRepository.create(createEventTypeDto);
    const productId = await this.stripeService.createProduct(
      eventType.name,
      eventType.description,
    );
    const priceId = await this.stripeService.createPrice(productId, 2900);
    eventType.stripe_product_id = productId;
    eventType.stripe_price_id = priceId;
    return this.eventTypeRepository.save(eventType);
  }

  findAll(): Promise<EventType[]> {
    return this.eventTypeRepository.find();
  }

  async findOne(id: number): Promise<EventType | null> {
    const eventType = await this.eventTypeRepository.findOneBy({ id });
    if (!eventType) {
      throw new NotFoundException('Event type not found');
    }
    return eventType;
  }

  async update(
    id: number,
    updateEventTypeDto: UpdateEventTypeDto,
  ): Promise<UpdateResult> {
    const eventType = await this.findOne(id);
    if (!eventType) {
      throw new NotFoundException('Event type not found');
    }
    return this.eventTypeRepository.update(id, updateEventTypeDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const eventType = await this.findOne(id);
    if (!eventType) {
      throw new NotFoundException('Event type not found');
    }
    return this.eventTypeRepository.softDelete(id);
  }
}
