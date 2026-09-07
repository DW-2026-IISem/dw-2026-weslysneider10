import { Inject, Injectable } from '@nestjs/common';
import { Client } from '../../domain/entities/client.entity.js';
import { ClientNotFoundException } from '../../domain/exceptions/client.exceptions.js';
import { CLIENT_REPOSITORY } from '../../domain/interfaces/client-repository.interface.js';
import type { ClientRepository } from '../../domain/interfaces/client-repository.interface.js';

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
