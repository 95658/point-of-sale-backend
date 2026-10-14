import { Body, Controller, Delete, Get, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './Dto/create-product.dto.js';
import { ProductsService } from './products.service.js';
import { UpdateProductDto } from './Dto/update-product.dto.js';
import { GetProductsQueryDto } from './Dto/product_query_dto.js';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard.js';
import { roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { imageUploadOptions, uploadsRoute } from '../uploads/image-upload.js';



@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @roles('admin', 'cashier')
  getProducts(@Query() query: GetProductsQueryDto) {
    return this.productsService.getProducts(
      query.page,
      query.limit,
      query.search,
      query.categoryId,
      query.sortBy,
      query.order,
    );
  }

  @Post()
  @roles('admin')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const imagePath = image ? `${uploadsRoute}${image.filename}` : undefined;
    return this.productsService.createProduct(createProductDto, imagePath);
  }

  @Patch()
  @roles('admin')
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  updateProduct(
    @Query('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const imagePath = image ? `${uploadsRoute}${image.filename}` : undefined;
    return this.productsService.updateProduct(Number(id), updateProductDto, imagePath);
  }

  @Delete()
  @roles('admin')
  deleteProduct(@Query('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}