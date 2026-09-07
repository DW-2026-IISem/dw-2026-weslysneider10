import { Client } from '../../../domain/entities/client.entity.js';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ClientDuplicateDocumentException,
  ClientNotFoundException,
} from '../../../domain/exceptions/client.exceptions.js';
import { ClientResponseDto } from '../../../application/dto/client-response.dto.js';
import { CreateClientDto } from '../../../application/dto/create-client.dto.js';
import { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case.js';
import { GetClientUseCase } from '../../../application/use-cases/get-client.use-case.js';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientUseCase: GetClientUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateClientDto): Promise<ClientResponseDto> {
    try {
      const client = await this.createClientUseCase.execute(dto);
      return ClientResponseDto.fromEntity(client);
    } catch (error) {
      if (error instanceof ClientDuplicateDocumentException) {
        throw new ConflictException((error as Error).message);
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<ClientResponseDto[]> {
    const clients = await this.getClientUseCase.executeList();
    return clients.map((c: Client) => ClientResponseDto.fromEntity(c));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientResponseDto> {
    try {
      const client = await this.getClientUseCase.execute(id);
      return ClientResponseDto.fromEntity(client);
    } catch (error) {
      if (error instanceof ClientNotFoundException) {
        throw new NotFoundException((error as Error).message);
      }
      throw error;
    }
  }
}
