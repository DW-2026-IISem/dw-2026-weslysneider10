import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateProductUseCase } from '../../../application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../../../application/use-cases/delete-product.use-case';
import { GetProductUseCase } from '../../../application/use-cases/get-product.use-case';
import { ListProductsUseCase } from '../../../application/use-cases/list-products.use-case';
import { UpdateProductUseCase } from '../../../application/use-cases/update-product.use-case';

import { CreateProductDto } from '../../../application/dto/create-product.dto';
import { ProductFilterDto } from '../../../application/dto/product-filter.dto';
import { ProductResponseDto } from '../../../application/dto/product-response.dto';
import { UpdateProductDto } from '../../../application/dto/update-product.dto';

@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.createProductUseCase.execute(dto);

    return product;
  }

  @Get()
  async findAll(
    @Query() filters: ProductFilterDto,
  ) {
    return this.listProductsUseCase.execute(filters);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ProductResponseDto> {
    const product = await this.getProductUseCase.execute(Number(id));

    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.updateProductUseCase.execute(
      Number(id),
      dto,
    );

    return product;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<void> {
    await this.deleteProductUseCase.execute(Number(id));
  }
}
