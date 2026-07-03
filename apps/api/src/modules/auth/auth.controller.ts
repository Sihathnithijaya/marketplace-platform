import { Body, Controller, Post } from "@nestjs/common";
import { IsEmail } from "class-validator";
import { AuthService } from "./auth.service";

class AuthDto {
  @IsEmail()
  email: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto.email);
  }

  @Post("login")
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto.email);
  }
}
