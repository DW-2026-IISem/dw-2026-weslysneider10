import {
  ClientResponseDto,
  CreateClientDto,
  PatchClientDto,
  UpdateClientDto,
  toClientResponse,
} from "./dto";
import { ClientRepository } from "./client.repository";
import { Client, ClientI } from "./client.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Client.
 *
 * Reglas de negocio: default de `status`, política de borrado lógico,
 * borrado físico y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
export class ClientService {
  public constructor(
    private readonly repository: ClientRepository = new ClientRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<ClientResponseDto[]> {
    const clients = await this.repository.findAllActive();
    return clients.map((client) => toClientResponse(client));
  }

  public async getOne(id: number): Promise<ClientResponseDto> {
    return toClientResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateClientDto): Promise<ClientResponseDto> {
    const client = await this.repository.create({
      name: requireName(body.name),
      address: optionalText(body.address),
      phone: optionalText(body.phone),
      email: optionalText(body.email),
      status: body.status ?? "active",
    });
    return toClientResponse(client);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateClientDto): Promise<ClientResponseDto> {
    const client = await this.findOrFail(id);
    await this.repository.update(client, {
      name: requireName(body.name),
      address: optionalText(body.address),
      phone: optionalText(body.phone),
      email: optionalText(body.email),
    });
    return toClientResponse(client);
  }

  public async updatePatch(id: number, body: PatchClientDto): Promise<ClientResponseDto> {
    const client = await this.findOrFail(id);

    // Solo los campos editables: status no se toca por PATCH (ver UpdateClientDto).
    const data: Partial<ClientI> = {};
    if (body.name !== undefined) data.name = requireName(body.name);
    if (body.address !== undefined) data.address = optionalText(body.address);
    if (body.phone !== undefined) data.phone = optionalText(body.phone);
    if (body.email !== undefined) data.email = optionalText(body.email);

    await this.repository.update(client, data);
    return toClientResponse(client);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    // onlyActive: false -> también permite purgar un registro ya desactivado.
    const client = await this.findOrFail(id, false);
    await this.repository.delete(client);
  }

  /** Eliminación lógica -> status = inactive. */
  public async deleteLogical(id: number): Promise<ClientResponseDto> {
    const client = await this.findOrFail(id);
    await this.repository.update(client, { status: "inactive" });
    return toClientResponse(client);
  }

  // ================== HELPERS ==================
  /**
   * Busca por PK y falla con 404 si no existe.
   *
   * `onlyActive` (por defecto true) aplica la política de borrado lógico:
   * un registro inactive deja de ser visible para la API, igual que en
   * getAll. Así getOne, updatePut, updatePatch y deleteLogical quedan
   * consistentes sin repetir la comprobación en cada método.
   */
  private async findOrFail(id: number, onlyActive = true): Promise<Client> {
    const client = await this.repository.findById(id);
    if (!client || (onlyActive && client.status !== "active")) {
      throw new AppError(404, "Client not found");
    }
    return client;
  }
}

/** name obligatorio y sin espacios sobrantes. */
function requireName(value: unknown): string {
  const name = typeof value === "string" ? value.trim() : "";
  if (!name) {
    throw new AppError(400, "name is required");
  }
  return name;
}

/** Campo opcional: cadena vacía o ausente -> NULL. */
function optionalText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}
