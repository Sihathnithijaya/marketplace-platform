import { Body, Controller, Get, Post } from "@nestjs/common";
import { IsString, MinLength } from "class-validator";
import { VendorsService } from "./vendors.service";

class CreateVendorDto {
  @IsString()
  userId: string;

  @IsString()
  @MinLength(2)
  shopName: string;
}

@Controller("vendors")
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  findAll() {
    return this.vendorsService.findAll();
  }

  @Post()
  create(@Body() dto: CreateVendorDto) {
    return this.vendorsService.create(dto.userId, dto.shopName);
  }
}
