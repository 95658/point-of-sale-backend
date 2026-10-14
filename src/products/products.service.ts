import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './Dto/create-product.dto.js';
import { UpdateProductDto } from './Dto/update-product.dto.js';
import { db } from '../prisma/db.js';

@Injectable()
export class ProductsService {
  async getProducts(
    page = 1,
    limit = 10,
    search?: string,
    categoryId?: number,
    sortBy: 'name' | 'price' = 'name',
    sortWay: 'asc' | 'desc' = 'asc',
  ) {
    const offset = (page - 1) * limit;

    let query = db.orm.public.Product.include('category');
    query = query.orderBy((product) =>
      sortBy === 'price'
        ? product.price[sortWay]()
        : product.name[sortWay]()
    );

    if (search?.trim()) {
      const searchTerm = `%${search.trim()}%`;

      query = query.where((product) =>
        product.name.ilike(searchTerm),
      );
    }

    if (categoryId !== undefined) {
      query = query.where({ categoryId });
    }

    const products = await query
      .limit(limit + 1)
      .offset(offset)
      .all();

      const hasNextPage = products.length > limit ;

      const data = products.slice(0,limit);

    return {
      data,
      page,
      limit,
      hasNextPage,
    };
  }

  async getProduct(id: number) {
    const product = await db.orm.public.Product.include('category').first({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async createProduct(createProductDto: CreateProductDto, image?: string) {
    return await db.orm.public.Product.create({
      name: createProductDto.name,
      price: createProductDto.price,
      categoryId: createProductDto.categoryId,
      image,
      description: createProductDto.description || null,
    });
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    image?: string,
  ) {
    const updates: {
      name?: string;
      price?: number;
      categoryId?: number;
      description?: string | null;
      image?: string;
    } = {};
    if (updateProductDto.name !== undefined) updates.name = updateProductDto.name;
    if (updateProductDto.price !== undefined) updates.price = updateProductDto.price;
    if (updateProductDto.categoryId !== undefined) updates.categoryId = updateProductDto.categoryId;
    if (updateProductDto.description !== undefined) {
      updates.description = updateProductDto.description || null;
    }
    if (image !== undefined) updates.image = image;

    const product = await db.orm.public.Product.where({ id }).update(updates);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      message: 'Product updated successfully',
      product,
    };
  }

  async deleteProduct(id: number) {
    const product = await db.orm.public.Product
      .where({ id })
      .delete();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      message: 'Product deleted successfully',
      product,
    };
  }
}