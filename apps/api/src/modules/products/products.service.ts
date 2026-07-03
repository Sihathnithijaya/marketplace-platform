import { Injectable } from "@nestjs/common";

export interface Product {
  id: string;
  vendorId: string;
  title: string;
  priceCents: number;
  stock: number;
}

@Injectable()
export class ProductsService {
  // TODO: replace with Prisma once the database schema is added.
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findByVendor(vendorId: string): Product[] {
    return this.products.filter((p) => p.vendorId === vendorId);
  }

  create(vendorId: string, title: string, priceCents: number, stock: number): Product {
    const product: Product = {
      id: crypto.randomUUID(),
      vendorId,
      title,
      priceCents,
      stock,
    };
    this.products.push(product);
    return product;
  }
}
