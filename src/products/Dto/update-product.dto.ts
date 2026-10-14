import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;
    
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    categoryId?: number;

    @IsOptional()
    @IsString()
    description?: string;
}