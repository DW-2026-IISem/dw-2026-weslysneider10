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
import { CreateBranchDto } from '../../../application/dto/create-branch.dto';
import { UpdateBranchDto } from '../../../application/dto/update-branch.dto';
import { BranchFilterDto } from '../../../application/dto/branch-filter.dto';
import { BranchResponseDto } from '../../../application/dto/branch-response.dto';
import { CreateBranchUseCase } from '../../../application/use-cases/create-branch.use-case';
import { UpdateBranchUseCase } from '../../../application/use-cases/update-branch.use-case';
import { DeleteBranchUseCase } from '../../../application/use-cases/delete-branch.use-case';
import { GetBranchUseCase } from '../../../application/use-cases/get-branch.use-case';
import { ListBranchesUseCase } from '../../../application/use-cases/list-branches.use-case';

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly updateBranchUseCase: UpdateBranchUseCase,
    private readonly deleteBranchUseCase: DeleteBranchUseCase,
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly listBranchesUseCase: ListBranchesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una sucursal' })
  @ApiCreatedResponse({ type: BranchResponseDto })
  create(@Body() dto: CreateBranchDto) {
    return this.createBranchUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar sucursales' })
  @ApiOkResponse({ type: [BranchResponseDto] })
  findAll(@Query() filter: BranchFilterDto) {
    return this.listBranchesUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sucursal por ID' })
  @ApiOkResponse({ type: BranchResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getBranchUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una sucursal' })
  @ApiOkResponse({ type: BranchResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: UpdateBranchDto,
  ) {
    return this.updateBranchUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una sucursal' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteBranchUseCase.execute(id);
  }
}
