import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';
import { EventType } from './entities/event-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeService } from 'src/stripe/stripe.service';
@Module({
  imports: [TypeOrmModule.forFeature([EventType])],
  controllers: [EventTypesController],
  providers: [EventTypesService, StripeService],
})
export class EventTypesModule {}
