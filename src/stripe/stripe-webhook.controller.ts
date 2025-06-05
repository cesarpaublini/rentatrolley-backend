import { Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { LeadsService } from 'src/leads/leads.service';
import { CustomersService } from 'src/customers/customers.service';
import { forwardRef, Inject } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import {
  MailTemplates,
  MailSubjects,
  MailTexts,
} from 'src/utils/mail-templates';
import { EventTypesService } from 'src/event-types/event-types.service';

@Controller('stripe-webhook')
export class StripeWebhookController {
  private stripe: Stripe;
  constructor(
    private configService: ConfigService,
    @Inject(forwardRef(() => LeadsService))
    private readonly leadService: LeadsService,
    private readonly customerService: CustomersService,
    private readonly mailService: MailService,
    private readonly eventTypeService: EventTypesService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-04-30.basil',
    });
  }

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const event: Stripe.Event = req.body as Stripe.Event;
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        // eslint-disable-next-line no-case-declarations
        const checkoutSession = event.data.object;
        // Create customer from metadata
        if (checkoutSession.metadata?.uuid) {
          const lead = await this.leadService.findByColumn(
            'uuid',
            checkoutSession.metadata?.uuid,
          );
          if (!lead) {
            throw new Error('Lead not found');
          }

          // Get event type
          const eventType = await this.eventTypeService.findOne(
            lead.event_type_id,
          );
          // Transform lead to customer
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const customer = await this.customerService.create({
            first_name: lead.first_name,
            last_name: lead.last_name,
            email: lead.email,
            phone_number: lead.phone_number,
            lead_id: lead.id,
          });
          // Send email notification to the customer
          await this.mailService.sendEmail(
            lead.email,
            MailSubjects.PURCHASE,
            MailTexts.PURCHASE,
            MailTemplates.PURCHASE,
            {
              customer_name: `${lead.first_name} ${lead.last_name}`,
              hours_reserved: lead.duration_hours,
              total_price: checkoutSession.amount_total,
              service_name: eventType?.name,
              start_date: new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }).format(new Date(lead.pickup_date)),
              year: new Date().getFullYear(),
            },
          );
        }

        console.log('Checkout session was successful!');
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
}
