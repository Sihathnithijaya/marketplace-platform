import { Injectable } from "@nestjs/common";

export interface Vendor {
  id: string;
  userId: string;
  shopName: string;
  isApproved: boolean;
}

@Injectable()
export class VendorsService {
  // TODO: replace with Prisma once the database schema is added.
  private vendors: Vendor[] = [];

  findAll(): Vendor[] {
    return this.vendors;
  }

  create(userId: string, shopName: string): Vendor {
    const vendor: Vendor = {
      id: crypto.randomUUID(),
      userId,
      shopName,
      isApproved: false, // vendors start unapproved until an admin reviews them
    };
    this.vendors.push(vendor);
    return vendor;
  }
}
