import { Injectable } from "@nestjs/common";

export type UserRole = "customer" | "vendor" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

@Injectable()
export class UsersService {
  // TODO: replace with real Prisma queries once the database schema is added.
  private users: User[] = [];

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  create(email: string, role: UserRole = "customer"): User {
    const user: User = { id: crypto.randomUUID(), email, role };
    this.users.push(user);
    return user;
  }
}
