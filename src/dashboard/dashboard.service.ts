import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';
@Injectable()
export class DashboardService {
  async getStats() {
    const [products, categories, users] = await Promise.all([
      db.orm.public.Product.aggregate((aggregate) => ({
        total: aggregate.count(),
      })),
      db.orm.public.Category.aggregate((aggregate) => ({
        total: aggregate.count(),
      })),
      db.orm.public.User.aggregate((aggregate) => ({
        total: aggregate.count(),
      })),
    ]);
    return {
      totalProducts: products.total,
      totalCategories: categories.total,
      totalUsers: users.total,
    };
  }
}