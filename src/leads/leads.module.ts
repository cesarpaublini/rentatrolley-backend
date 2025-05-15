import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { MailModule } from 'src/mail/mail.module';
import { City } from 'src/cities/entities/city.entity';
import { StripeModule } from 'src/stripe/stripe.module';
import { EventType } from 'src/event-types/entities/event-type.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, City, EventType]),
    MailModule,
    StripeModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
