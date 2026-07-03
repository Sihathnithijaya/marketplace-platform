export interface Product {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
