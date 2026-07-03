import { Injectable } from "@nestjs/common";

export interface CartLineItem {
  productId: string;
  vendorId: string;
  quantity: number;
  priceCents: number;
}

export interface SubOrder {
  id: string;
  vendorId: string;
  items: CartLineItem[];
  subtotalCents: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}

export interface Order {
  id: string;
  userId: string;
  subOrders: SubOrder[];
  totalCents: number;
  status: "pending" | "paid";
  createdAt: string;
}

@Injectable()
export class OrdersService {
  // TODO: replace with a real Prisma transaction once the database schema is added.
  private orders: Order[] = [];

  /**
   * A cart can contain items from several vendors. This splits one cart into
   * one sub-order per vendor, which is the core rule of a multi-vendor
   * marketplace: each vendor ships and gets paid independently.
   */
  createOrderFromCart(userId: string, cartItems: CartLineItem[]): Order {
    const itemsByVendor = new Map<string, CartLineItem[]>();
    for (const item of cartItems) {
      const existing = itemsByVendor.get(item.vendorId) ?? [];
      existing.push(item);
      itemsByVendor.set(item.vendorId, existing);
    }

    const subOrders: SubOrder[] = Array.from(itemsByVendor.entries()).map(
      ([vendorId, items]) => ({
        id: crypto.randomUUID(),
        vendorId,
        items,
        subtotalCents: items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
        status: "pending",
      })
    );

    const order: Order = {
      id: crypto.randomUUID(),
      userId,
      subOrders,
      totalCents: subOrders.reduce((sum, s) => sum + s.subtotalCents, 0),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);
    return order;
  }

  findByUser(userId: string): Order[] {
    return this.orders.filter((o) => o.userId === userId);
  }
}
