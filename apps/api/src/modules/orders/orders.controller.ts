import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { IsArray, IsString } from "class-validator";
import { OrdersService, CartLineItem } from "./orders.service";

class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  cartItems: CartLineItem[];
}

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrderFromCart(dto.userId, dto.cartItems);
  }

  @Get()
  findByUser(@Query("userId") userId: string) {
    return this.ordersService.findByUser(userId);
  }
}
