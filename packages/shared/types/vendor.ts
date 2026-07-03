export interface Vendor {
  id: string;
  userId: string;
  shopName: string;
  slug: string;
  stripeAccountId: string | null;
  isApproved: boolean;
  createdAt: string;
}
