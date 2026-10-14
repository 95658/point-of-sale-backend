import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { db } from '../prisma/db.js';
import { UpdateCategoryDto } from './dto/update_category_dto.js';

@Injectable()
export class CategoriesService {

    async createCategory(createCategoryDto: CreateCategoryDto, image?: string) {
        return await db.orm.public.Category.create({
            name: createCategoryDto.name,
            image,
        });
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto, image?: string) {
        const category = await db.orm.public.Category.first({ id });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        if (updateCategoryDto.name === undefined && image === undefined) {
            return category; // No update needed, return the existing category
        }

        const updates: { name?: string; image?: string } = {};
        if (updateCategoryDto.name !== undefined) {
            updates.name = updateCategoryDto.name;
        }
        if (image !== undefined) {
            updates.image = image;
        }

        return await db.orm.public.Category.where({ id }).update(updates);
    }

    async getCategories() {
        return await db.orm.public.Category.all();
    }

    async deleteCategory(id: number) {
        const category = await db.orm.public.Category.first({ id });

        if (!category) {
            throw new NotFoundException('Category not found');
        }
        const products = await db.orm.public.Product.where({ categoryId: id }).all();
        if (products.length > 0) {
            throw new BadRequestException('Cannot delete category with associated products');
        }
        
        return await db.orm.public.Category.where({ id }).delete();
    }

    async getCategoryById(id: number) {
        const category = await db.orm.public.Category.include('products').first({ id });

        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }
}
