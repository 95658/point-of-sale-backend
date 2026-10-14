import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { RolesGuard } from './guard/roles.guard.js';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET is missing from environment');
        }

        return {
          secret,
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [RolesGuard],
  controllers: [AuthController],
})
export class AuthModule { }