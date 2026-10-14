import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module.js';

@Module({
  imports: [ProductsModule, CategoriesModule, UsersModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DashboardModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
