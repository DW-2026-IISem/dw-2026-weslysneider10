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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe';
import { CreateInventoryDto } from '../../../application/dto/create-inventory.dto';
import { UpdateInventoryDto } from '../../../application/dto/update-inventory.dto';
import { InventoryFilterDto } from '../../../application/dto/inventory-filter.dto';
import { InventoryResponseDto } from '../../../application/dto/inventory-response.dto';
import { CreateInventoryUseCase } from '../../../application/use-cases/create-inventory.use-case';
import { UpdateInventoryUseCase } from '../../../application/use-cases/update-inventory.use-case';
import { DeleteInventoryUseCase } from '../../../application/use-cases/delete-inventory.use-case';
import { GetInventoryUseCase } from '../../../application/use-cases/get-inventory.use-case';
import { ListInventoryUseCase } from '../../../application/use-cases/list-inventory.use-case';
import { ListLowStockUseCase } from '../../../application/use-cases/list-low-stock.use-case';

@ApiTags('Inventory')
@Controller('inventories')
export class InventoriesController {
  constructor(
    private readonly createInventoryUseCase: CreateInventoryUseCase,
    private readonly updateInventoryUseCase: UpdateInventoryUseCase,
    private readonly deleteInventoryUseCase: DeleteInventoryUseCase,
    private readonly getInventoryUseCase: GetInventoryUseCase,
    private readonly listInventoryUseCase: ListInventoryUseCase,
    private readonly listLowStockUseCase: ListLowStockUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un registro de inventario' })
  @ApiCreatedResponse({ type: InventoryResponseDto })
  create(@Body() dto: CreateInventoryDto) {
    return this.createInventoryUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar inventario (filtro por sucursal/producto)' })
  @ApiOkResponse({ type: [InventoryResponseDto] })
  findAll(@Query() filter: InventoryFilterDto) {
    return this.listInventoryUseCase.execute(filter);
  }

  @Get('low-stock')
  @ApiOperation({ summary: 'Alertas de reposición (cantidad <= stock mínimo)' })
  @ApiQuery({ name: 'branchId', required: false, example: 1 })
  @ApiOkResponse({ type: [InventoryResponseDto] })
  findLowStock(@Query('branchId') branchId?: string) {
    return this.listLowStockUseCase.execute(
      branchId ? Number(branchId) : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de inventario por ID' })
  @ApiOkResponse({ type: InventoryResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getInventoryUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cantidad/stock mínimo' })
  @ApiOkResponse({ type: InventoryResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateInventoryDto,
  ) {
    return this.updateInventoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un registro de inventario' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteInventoryUseCase.execute(id);
  }
}
