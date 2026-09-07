import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from '../../../domain/entities/client.entity.js';
import { ClientRepository } from '../../../domain/interfaces/client-repository.interface.js';
import { ClientModel } from '../models/client.model.js';

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
    return found.map((f: ClientModel) => this.toDomain(f));
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
