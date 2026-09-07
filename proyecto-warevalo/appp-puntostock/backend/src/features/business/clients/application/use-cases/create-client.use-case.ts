import { Inject, Injectable } from '@nestjs/common';
import { Client } from '../../domain/entities/client.entity.js';
import { ClientDuplicateDocumentException } from '../../domain/exceptions/client.exceptions.js';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface.js';
import type { ClientRepository } from '../../domain/interfaces/client-repository.interface.js';
import { CreateClientDto } from '../dto/create-client.dto.js';

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
