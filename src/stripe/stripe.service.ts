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
  /**
   * Create a one-time payment link for a product
   * @param stripe_price_id - The ID of the Stripe price to be purchased
   * @param duration_hours - The duration of the service in hours
   * @param trolley_amount - The amount of trolleys to be rented
   * @param uuid - The UUID of the user
   * @returns The URL of the payment link
   */
  async createPaymentLink(
    stripe_price_id: string,
    duration_hours: number,
    trolley_amount: number,
    uuid: string,
  ): Promise<string> {
    const paymentLink = await this.stripe.paymentLinks.create({
      line_items: [
        {
          price: stripe_price_id,
          quantity: duration_hours * trolley_amount,
        },
      ],
      custom_text: {
        submit: {
          message: `This payment is for ${duration_hours} hours of service for ${trolley_amount} trolleys.`,
        },
      },
      customer_creation: 'always',
      metadata: {
        uuid,
        duration_hours,
        trolley_amount,
      },
      restrictions: {
        completed_sessions: {
          limit: 1,
        },
      },
    });

    return paymentLink.url;
  }

  /**
   * Create a product in Stripe
   * @param name - The name of the product
   * @param description - The description of the product
   * @returns The ID of the product
   */
  async createProduct(name: string, description: string): Promise<string> {
    const product = await this.stripe.products.create({
      name,
      description,
    });
    return product.id;
  }

  /**
   * Create a price for a product in Stripe
   * @param productId - The ID of the product
   * @param amount - The amount of the price
   * @returns The ID of the price
   */
  async createPrice(productId: string, amount: number): Promise<string> {
    const price = await this.stripe.prices.create({
      product: productId,
      currency: 'usd',
      unit_amount: amount,
    });
    return price.id;
  }
}
