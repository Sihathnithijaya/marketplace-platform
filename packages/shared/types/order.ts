export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  quantity: number;
  priceCents: number;
}

export interface SubOrder {
  id: string;
  orderId: string;
  vendorId: string;
  items: OrderItem[];
  status: OrderStatus;
  stripeTransferId: string | null;
}

export interface Order {
  id: string;
  userId: string;
  subOrders: SubOrder[];
  totalCents: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
}
