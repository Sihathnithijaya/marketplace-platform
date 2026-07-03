import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { IsInt, IsString, Min, MinLength } from "class-validator";
import { ProductsService } from "./products.service";

class CreateProductDto {
  @IsString()
  vendorId: string;

  @IsString()
  @MinLength(2)
  title: string;

  @IsInt()
  @Min(0)
  priceCents: number;

  @IsInt()
  @Min(0)
  stock: number;
}

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query("vendorId") vendorId?: string) {
    return vendorId
      ? this.productsService.findByVendor(vendorId)
      : this.productsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto.vendorId, dto.title, dto.priceCents, dto.stock);
  }
}
