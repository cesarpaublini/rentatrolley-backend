import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeWebhookController } from './stripe-webhook.controller';
import { CustomersModule } from 'src/customers/customers.module';
import { LeadsModule } from 'src/leads/leads.module';
import { MailService } from 'src/mail/mail.service';
import { EventTypesModule } from 'src/event-types/event-types.module';
@Module({
  imports: [
    ConfigModule,
    forwardRef(() => LeadsModule),
    CustomersModule,
    forwardRef(() => EventTypesModule),
  ],
  providers: [StripeService, MailService],
  exports: [StripeService],
  controllers: [StripeWebhookController],
})
export class StripeModule {}
