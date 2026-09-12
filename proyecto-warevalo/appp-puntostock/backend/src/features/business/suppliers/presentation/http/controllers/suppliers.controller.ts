import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe';
import { CreateSupplierDto } from '../../../application/dto/create-supplier.dto';
import { UpdateSupplierDto } from '../../../application/dto/update-supplier.dto';
import { SupplierFilterDto } from '../../../application/dto/supplier-filter.dto';
import { SupplierResponseDto } from '../../../application/dto/supplier-response.dto';
import { CreateSupplierUseCase } from '../../../application/use-cases/create-supplier.use-case';
import { UpdateSupplierUseCase } from '../../../application/use-cases/update-supplier.use-case';
import { DeleteSupplierUseCase } from '../../../application/use-cases/delete-supplier.use-case';
import { GetSupplierUseCase } from '../../../application/use-cases/get-supplier.use-case';
import { ListSuppliersUseCase } from '../../../application/use-cases/list-suppliers.use-case';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
    private readonly deleteSupplierUseCase: DeleteSupplierUseCase,
    private readonly getSupplierUseCase: GetSupplierUseCase,
    private readonly listSuppliersUseCase: ListSuppliersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un proveedor' })
  @ApiCreatedResponse({ type: SupplierResponseDto })
  create(@Body() dto: CreateSupplierDto) {
    return this.createSupplierUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar proveedores' })
  @ApiOkResponse({ type: [SupplierResponseDto] })
  findAll(@Query() filter: SupplierFilterDto) {
    return this.listSuppliersUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proveedor por ID' })
  @ApiOkResponse({ type: SupplierResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getSupplierUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proveedor' })
  @ApiOkResponse({ type: SupplierResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateSupplierDto,
  ) {
    return this.updateSupplierUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un proveedor' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteSupplierUseCase.execute(id);
  }
}
