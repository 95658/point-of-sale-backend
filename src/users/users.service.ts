import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    return await db.orm.public.User.first({ email });
  }

  async findById(id: number) {
    return await db.orm.public.User.first({ id });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return await db.orm.public.User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  async getUsers() {
    const users = await db.orm.public.User.all();

    return users.map(({ password, ...user }) => user);
  }
}