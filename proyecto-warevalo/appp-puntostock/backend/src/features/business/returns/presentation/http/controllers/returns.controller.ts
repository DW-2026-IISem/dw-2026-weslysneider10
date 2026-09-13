import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe';
import { CreateReturnDto } from '../../../application/dto/create-return.dto';
import { ReturnFilterDto } from '../../../application/dto/return-filter.dto';
import { ReturnResponseDto } from '../../../application/dto/return-response.dto';
import { CreateReturnUseCase } from '../../../application/use-cases/create-return.use-case';
import { CancelReturnUseCase } from '../../../application/use-cases/cancel-return.use-case';
import { GetReturnUseCase } from '../../../application/use-cases/get-return.use-case';
import { ListReturnsUseCase } from '../../../application/use-cases/list-returns.use-case';
import { ListReturnsBySaleUseCase } from '../../../application/use-cases/list-returns-by-sale.use-case';

@ApiTags('Returns')
@Controller('api/returns')
export class ReturnsController {
  constructor(
    private readonly createReturnUseCase: CreateReturnUseCase,
    private readonly cancelReturnUseCase: CancelReturnUseCase,
    private readonly getReturnUseCase: GetReturnUseCase,
    private readonly listReturnsUseCase: ListReturnsUseCase,
    private readonly listReturnsBySaleUseCase: ListReturnsBySaleUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una devolución' })
  @ApiCreatedResponse({ type: ReturnResponseDto })
  create(@Body() dto: CreateReturnDto) {
    return this.createReturnUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar devoluciones' })
  @ApiOkResponse({ type: [ReturnResponseDto] })
  findAll(@Query() filter: ReturnFilterDto) {
    return this.listReturnsUseCase.execute(filter);
  }

  @Get('sale/:saleId')
  @ApiOperation({ summary: 'Listar devoluciones de una venta' })
  @ApiOkResponse({ type: [ReturnResponseDto] })
  findBySale(@Param('saleId', ParsePositiveIntPipe) saleId: number) {
    return this.listReturnsBySaleUseCase.execute(saleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una devolución por ID' })
  @ApiOkResponse({ type: ReturnResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getReturnUseCase.execute(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar una devolución (revierte el stock repuesto)' })
  @ApiOkResponse({ type: ReturnResponseDto })
  cancel(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.cancelReturnUseCase.execute(id);
  }
}
