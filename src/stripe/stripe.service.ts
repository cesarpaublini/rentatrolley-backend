import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-04-30.basil',
    });
  }
  async createPaymentLink(duration_hours: number): Promise<string> {
    const paymentLink = await this.stripe.paymentLinks.create({
      line_items: [
        {
          price: 'price_1RMD3nA01KFVlQs9Fd0SMHPk',
          quantity: duration_hours,
        },
      ],
    });

    return paymentLink.url;
  }
}
