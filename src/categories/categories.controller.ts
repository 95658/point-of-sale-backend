import { Body, Controller, Delete, Get, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { CategoriesService } from './categories.service.js';
import { UpdateCategoryDto } from './dto/update_category_dto.js';
import { imageUploadOptions, uploadsRoute } from '../uploads/image-upload.js';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image', imageUploadOptions))
    async createCategory(
        @Body() createCategoryDto: CreateCategoryDto,
        @UploadedFile() image?: Express.Multer.File,
    ) {
        const imagePath = image ? `${uploadsRoute}${image.filename}` : undefined;
        return this.CategoriesService.createCategory(createCategoryDto, imagePath);
    }

    @Get()
    async getCategories(@Query('id') id?: string) {
        if (id) {
            return this.CategoriesService.getCategoryById(Number(id));
        }
        return this.CategoriesService.getCategories();
    }

    @Delete()
    async deleteCategory(@Query('id') id: string) {
        return this.CategoriesService.deleteCategory(Number(id));
    }

    @Patch()
    @UseInterceptors(FileInterceptor('image', imageUploadOptions))
    async updateCategory(
        @Query('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @UploadedFile() image?: Express.Multer.File,
    ) {
        const imagePath = image ? `${uploadsRoute}${image.filename}` : undefined;
        return this.CategoriesService.updateCategory(Number(id), updateCategoryDto, imagePath);
    }
}
