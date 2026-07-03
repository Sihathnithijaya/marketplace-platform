import { Body, Controller, Post } from "@nestjs/common";
import { IsEmail } from "class-validator";
import { PaymentsService } from "./payments.service";

class OnboardVendorDto {
  @IsEmail()
  email: string;
}

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("vendor-onboarding")
  onboardVendor(@Body() dto: OnboardVendorDto) {
    return this.paymentsService.createConnectedAccount(dto.email);
  }

  // NOTE: Stripe webhooks (payment_intent.succeeded, etc.) get their own
  // endpoint here later, verified with STRIPE_WEBHOOK_SECRET, and must be
  // idempotent since Stripe can deliver the same event more than once.
}
