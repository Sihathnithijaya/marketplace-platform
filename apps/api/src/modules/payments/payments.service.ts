import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2024-06-20",
    });
  }

  /**
   * Creates a Stripe Connect account for a vendor, so the platform can pay
   * them out directly for their share of an order.
   */
  async createConnectedAccount(email: string) {
    return this.stripe.accounts.create({
      type: "express",
      email,
      capabilities: {
        transfers: { requested: true },
        card_payments: { requested: true },
      },
    });
  }

  /**
   * Transfers a vendor's share of an order to their connected Stripe account,
   * after the platform fee has been deducted.
   */
  async transferToVendor(
    connectedAccountId: string,
    amountCents: number,
    currency: string,
    orderId: string
  ) {
    return this.stripe.transfers.create({
      amount: amountCents,
      currency,
      destination: connectedAccountId,
      transfer_group: orderId,
    });
  }
}
