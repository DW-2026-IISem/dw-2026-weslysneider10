import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe';
import { CreatePurchaseDto } from '../../../application/dto/create-purchase.dto';
import { PurchaseFilterDto } from '../../../application/dto/purchase-filter.dto';
import { PurchaseResponseDto } from '../../../application/dto/purchase-response.dto';
import { ReceivePurchaseDto } from '../../../application/dto/receive-purchase.dto';
import { CreatePurchaseUseCase } from '../../../application/use-cases/create-purchase.use-case';
import { ReceivePurchaseUseCase } from '../../../application/use-cases/receive-purchase.use-case';
import { CancelPurchaseUseCase } from '../../../application/use-cases/cancel-purchase.use-case';
import { GetPurchaseUseCase } from '../../../application/use-cases/get-purchase.use-case';
import { ListPurchasesUseCase } from '../../../application/use-cases/list-purchases.use-case';

@ApiTags('Purchases')
@Controller('api/purchases')
export class PurchasesController {
  constructor(
    private readonly createPurchaseUseCase: CreatePurchaseUseCase,
    private readonly receivePurchaseUseCase: ReceivePurchaseUseCase,
    private readonly cancelPurchaseUseCase: CancelPurchaseUseCase,
    private readonly getPurchaseUseCase: GetPurchaseUseCase,
    private readonly listPurchasesUseCase: ListPurchasesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una orden de compra' })
  @ApiCreatedResponse({ type: PurchaseResponseDto })
  create(@Body() dto: CreatePurchaseDto) {
    return this.createPurchaseUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar compras' })
  @ApiOkResponse({ type: [PurchaseResponseDto] })
  findAll(@Query() filter: PurchaseFilterDto) {
    return this.listPurchasesUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una compra por ID' })
  @ApiOkResponse({ type: PurchaseResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getPurchaseUseCase.execute(id);
  }

  @Patch(':id/receive')
  @ApiOperation({ summary: 'Registrar recepción parcial o total de una compra' })
  @ApiOkResponse({ type: PurchaseResponseDto })
  receive(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: ReceivePurchaseDto,
  ) {
    return this.receivePurchaseUseCase.execute(id, dto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar una compra' })
  @ApiOkResponse({ type: PurchaseResponseDto })
  cancel(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.cancelPurchaseUseCase.execute(id);
  }
}
