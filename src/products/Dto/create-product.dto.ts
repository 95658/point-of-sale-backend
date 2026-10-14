import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    categoryId: number;

    @IsOptional()
    @IsString()
    description?: string;
}