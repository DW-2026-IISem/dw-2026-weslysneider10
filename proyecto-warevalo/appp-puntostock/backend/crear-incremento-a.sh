### `crear-incremento-a.sh`

```bash
#!/bin/bash
set -e

BASE="src/features/business/clients"

mkdir -p "$BASE/domain/entities"
mkdir -p "$BASE/domain/exceptions"
mkdir -p "$BASE/domain/interfaces"
mkdir -p "$BASE/application/dto"
mkdir -p "$BASE/application/use-cases"
mkdir -p "$BASE/infrastructure/persistence/models"
mkdir -p "$BASE/infrastructure/persistence/repositories"
mkdir -p "$BASE/presentation/http/controllers"

# 1. Entidad de dominio
cat > "$BASE/domain/entities/client.entity.ts" << 'EOF'
export class Client {
  constructor(
    public readonly id: number | null,
    public tipoDocumento: string,
    public numeroDocumento: string,
    public nombre: string,
    public telefono: string | null,
    public email: string | null,
    public isActive: boolean = true,
  ) {}

  static create(props: {
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    telefono?: string;
    email?: string;
  }): Client {
    if (!props.nombre || props.nombre.trim().length === 0) {
      throw new Error('El nombre del cliente es obligatorio.');
    }
    if (!props.numeroDocumento || props.numeroDocumento.trim().length === 0) {
      throw new Error('El número de documento es obligatorio.');
    }
    return new Client(
      null,
      props.tipoDocumento,
      props.numeroDocumento,
      props.nombre.trim(),
      props.telefono ?? null,
      props.email ?? null,
      true,
    );
  }

  deactivate(): void {
    this.isActive = false;
  }
}
EOF

# 2. Excepciones de dominio
cat > "$BASE/domain/exceptions/client.exceptions.ts" << 'EOF'
export class ClientDuplicateDocumentException extends Error {
  constructor(numeroDocumento: string) {
    super(`Ya existe un cliente con el documento ${numeroDocumento}.`);
    this.name = 'ClientDuplicateDocumentException';
  }
}

export class ClientNotFoundException extends Error {
  constructor(id: number) {
    super(`No se encontró el cliente con id ${id}.`);
    this.name = 'ClientNotFoundException';
  }
}
EOF

# 3. Puerto del repositorio
cat > "$BASE/domain/interfaces/client-repository.interface.ts" << 'EOF'
import { Client } from '../entities/client.entity';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findById(id: number): Promise<Client | null>;
  findByDocumento(numeroDocumento: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
}
EOF

# 4. DTO de entrada
cat > "$BASE/application/dto/create-client.dto.ts" << 'EOF'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'CC' })
  @IsString()
  @IsNotEmpty()
  tipoDocumento: string;

  @ApiProperty({ example: '1082456789' })
  @IsString()
  @IsNotEmpty()
  numeroDocumento: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @ApiPropertyOptional({ example: '3001234567' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: 'juan.perez@correo.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
EOF

# 5. DTO de salida
cat > "$BASE/application/dto/client-response.dto.ts" << 'EOF'
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../domain/entities/client.entity';

export class ClientResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tipoDocumento: string;

  @ApiProperty()
  numeroDocumento: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty({ nullable: true })
  telefono: string | null;

  @ApiProperty({ nullable: true })
  email: string | null;

  @ApiProperty()
  isActive: boolean;

  static fromEntity(client: Client): ClientResponseDto {
    const dto = new ClientResponseDto();
    dto.id = client.id as number;
    dto.tipoDocumento = client.tipoDocumento;
    dto.numeroDocumento = client.numeroDocumento;
    dto.nombre = client.nombre;
    dto.telefono = client.telefono;
    dto.email = client.email;
    dto.isActive = client.isActive;
    return dto;
  }
}
EOF

# 6. Caso de uso: crear cliente
cat > "$BASE/application/use-cases/create-client.use-case.ts" << 'EOF'
import { Inject, Injectable } from '@nestjs/common';
import { Client } from '../../domain/entities/client.entity';
import { ClientDuplicateDocumentException } from '../../domain/exceptions/client.exceptions';
import {
  CLIENT_REPOSITORY,
  ClientRepository,
} from '../../domain/interfaces/client-repository.interface';
import { CreateClientDto } from '../dto/create-client.dto';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(dto: CreateClientDto): Promise<Client> {
    const existing = await this.clientRepository.findByDocumento(
      dto.numeroDocumento,
    );
    if (existing) {
      throw new ClientDuplicateDocumentException(dto.numeroDocumento);
    }

    const client = Client.create({
      tipoDocumento: dto.tipoDocumento,
      numeroDocumento: dto.numeroDocumento,
      nombre: dto.nombre,
      telefono: dto.telefono,
      email: dto.email,
    });

    return this.clientRepository.create(client);
  }
}
EOF

# 7. Caso de uso: consultar cliente
cat > "$BASE/application/use-cases/get-client.use-case.ts" << 'EOF'
import { Inject, Injectable } from '@nestjs/common';
import { Client } from '../../domain/entities/client.entity';
import { ClientNotFoundException } from '../../domain/exceptions/client.exceptions';
import {
  CLIENT_REPOSITORY,
  ClientRepository,
} from '../../domain/interfaces/client-repository.interface';

@Injectable()
export class GetClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(id: number): Promise<Client> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new ClientNotFoundException(id);
    }
    return client;
  }

  async executeList(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }
}
EOF

# 8. Modelo Sequelize
cat > "$BASE/infrastructure/persistence/models/client.model.ts" << 'EOF'
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'clientes', timestamps: true })
export class ClientModel extends Model {
  @Column({ type: DataType.STRING(10), allowNull: false, field: 'tipo_documento' })
  tipoDocumento: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
    field: 'numero_documento',
  })
  numeroDocumento: string;

  @Column({ type: DataType.STRING(150), allowNull: false })
  nombre: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  telefono: string | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  email: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' })
  isActive: boolean;
}
EOF

# 9. Repositorio Sequelize
cat > "$BASE/infrastructure/persistence/repositories/client.repository.ts" << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from '../../../domain/entities/client.entity';
import { ClientRepository } from '../../../domain/interfaces/client-repository.interface';
import { ClientModel } from '../models/client.model';

@Injectable()
export class SequelizeClientRepository implements ClientRepository {
  constructor(
    @InjectModel(ClientModel)
    private readonly clientModel: typeof ClientModel,
  ) {}

  async create(client: Client): Promise<Client> {
    const created = await this.clientModel.create({
      tipoDocumento: client.tipoDocumento,
      numeroDocumento: client.numeroDocumento,
      nombre: client.nombre,
      telefono: client.telefono,
      email: client.email,
      isActive: client.isActive,
    });
    return this.toDomain(created);
  }

  async findById(id: number): Promise<Client | null> {
    const found = await this.clientModel.findByPk(id);
    return found ? this.toDomain(found) : null;
  }

  async findByDocumento(numeroDocumento: string): Promise<Client | null> {
    const found = await this.clientModel.findOne({
      where: { numeroDocumento },
    });
    return found ? this.toDomain(found) : null;
  }

  async findAll(): Promise<Client[]> {
    const found = await this.clientModel.findAll({
      where: { isActive: true },
    });
    return found.map((f) => this.toDomain(f));
  }

  private toDomain(model: ClientModel): Client {
    return new Client(
      model.id,
      model.tipoDocumento,
      model.numeroDocumento,
      model.nombre,
      model.telefono,
      model.email,
      model.isActive,
    );
  }
}
EOF

# 10. Controlador
cat > "$BASE/presentation/http/controllers/clients.controller.ts" << 'EOF'
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
} from '../../../domain/exceptions/client.exceptions';
import { ClientResponseDto } from '../../../application/dto/client-response.dto';
import { CreateClientDto } from '../../../application/dto/create-client.dto';
import { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case';
import { GetClientUseCase } from '../../../application/use-cases/get-client.use-case';

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
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<ClientResponseDto[]> {
    const clients = await this.getClientUseCase.executeList();
    return clients.map((c) => ClientResponseDto.fromEntity(c));
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
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
EOF

# 11. Módulo del feature
cat > "$BASE/clients.module.ts" << 'EOF'
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CLIENT_REPOSITORY } from './domain/interfaces/client-repository.interface';
import { CreateClientUseCase } from './application/use-cases/create-client.use-case';
import { GetClientUseCase } from './application/use-cases/get-client.use-case';
import { ClientModel } from './infrastructure/persistence/models/client.model';
import { SequelizeClientRepository } from './infrastructure/persistence/repositories/client.repository';
import { ClientsController } from './presentation/http/controllers/clients.controller';

@Module({
  imports: [SequelizeModule.forFeature([ClientModel])],
  controllers: [ClientsController],
  providers: [
    CreateClientUseCase,
    GetClientUseCase,
    {
      provide: CLIENT_REPOSITORY,
      useClass: SequelizeClientRepository,
    },
  ],
  exports: [CLIENT_REPOSITORY],
})
export class ClientsModule {}
EOF

echo "✅ Incremento A (Cliente) creado correctamente en $BASE"
```
