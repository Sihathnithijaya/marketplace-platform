import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(email: string) {
    const existing = this.usersService.findByEmail(email);
    if (existing) {
      throw new UnauthorizedException("An account with this email already exists.");
    }
    const user = this.usersService.create(email);
    return this.issueTokens(user.id, user.role);
  }

  async login(email: string) {
    const user = this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials.");
    }
    // NOTE: password hashing/verification (e.g. bcrypt) belongs here once
    // the real Prisma User model with a passwordHash field is added.
    return this.issueTokens(user.id, user.role);
  }

  private issueTokens(userId: string, role: string) {
    const accessToken = this.jwtService.sign({ sub: userId, role });
    return { accessToken };
  }
}
