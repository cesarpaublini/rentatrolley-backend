import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeWebhookController } from './stripe-webhook.controller';
import { CustomersModule } from 'src/customers/customers.module';
import { LeadsModule } from 'src/leads/leads.module';
@Module({
  imports: [ConfigModule, forwardRef(() => LeadsModule), CustomersModule],
  providers: [StripeService],
  exports: [StripeService],
  controllers: [StripeWebhookController],
})
export class StripeModule {}
