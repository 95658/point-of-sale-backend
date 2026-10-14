import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { role } from '@prisma/orm-postgres/contract-builder';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(
        data: {
            name: string,
            email: string,
            password: string
        }
    ) {
        const email = data.email.trim().toLowerCase();
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.usersService.createUser({
            name: data.name,
            email: email,
            password: hashedPassword
        });

        return {
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            }
        };
    }

    async login(
        data: {
            email: string,
            password: string
        }
    ) {
        const email = data.email.trim().toLowerCase();
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const accessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email, });
        return {
            message: 'Login successful',
            token: accessToken,
            tokenType: 'Bearer',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    }
};
