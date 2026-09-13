import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe';
import { CreatePaymentDto } from '../../../application/dto/create-payment.dto';
import { PaymentFilterDto } from '../../../application/dto/payment-filter.dto';
import { PaymentResponseDto } from '../../../application/dto/payment-response.dto';
import { CreatePaymentUseCase } from '../../../application/use-cases/create-payment.use-case';
import { CancelPaymentUseCase } from '../../../application/use-cases/cancel-payment.use-case';
import { GetPaymentUseCase } from '../../../application/use-cases/get-payment.use-case';
import { ListPaymentsUseCase } from '../../../application/use-cases/list-payments.use-case';
import { ListPaymentsBySaleUseCase } from '../../../application/use-cases/list-payments-by-sale.use-case';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly cancelPaymentUseCase: CancelPaymentUseCase,
    private readonly getPaymentUseCase: GetPaymentUseCase,
    private readonly listPaymentsUseCase: ListPaymentsUseCase,
    private readonly listPaymentsBySaleUseCase: ListPaymentsBySaleUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un pago (soporta pagos mixtos)' })
  @ApiCreatedResponse({ type: PaymentResponseDto })
  create(@Body() dto: CreatePaymentDto) {
    return this.createPaymentUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pagos' })
  @ApiOkResponse({ type: [PaymentResponseDto] })
  findAll(@Query() filter: PaymentFilterDto) {
    return this.listPaymentsUseCase.execute(filter);
  }

  @Get('sale/:saleId')
  @ApiOperation({ summary: 'Desglose de pagos y saldo pendiente de una venta' })
  findBySale(@Param('saleId', ParsePositiveIntPipe) saleId: number) {
    return this.listPaymentsBySaleUseCase.execute(saleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiOkResponse({ type: PaymentResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getPaymentUseCase.execute(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar un pago' })
  @ApiOkResponse({ type: PaymentResponseDto })
  cancel(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.cancelPaymentUseCase.execute(id);
  }
}
