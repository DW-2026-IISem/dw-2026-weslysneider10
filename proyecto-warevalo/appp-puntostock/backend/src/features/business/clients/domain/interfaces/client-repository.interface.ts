import { Client } from '../entities/client.entity.js';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findById(id: number): Promise<Client | null>;
  findByDocumento(numeroDocumento: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;
}
