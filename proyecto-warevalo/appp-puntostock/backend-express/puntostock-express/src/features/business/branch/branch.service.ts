import {
  BranchResponseDto,
  CreateBranchDto,
  PatchBranchDto,
  UpdateBranchDto,
  toBranchResponse,
} from "./dto";
import { BranchRepository } from "./branch.repository";
import { Branch } from "./branch.model";
import { AppError } from "../../../shared/errors/app-error";

/**
 * Capa Service del feature Branch.
 *
 * Reglas de negocio: default de `status`, política de borrado lógico,
 * borrado físico y saneamiento de la respuesta.
 *
 * No conoce `req`/`res` ni escribe Sequelize directamente: delega en el
 * repository y devuelve DTOs, nunca instancias del modelo.
 */
export class BranchService {
  public constructor(
    private readonly repository: BranchRepository = new BranchRepository()
  ) {}

  // ================== READ ==================
  public async getAll(): Promise<BranchResponseDto[]> {
    const branches = await this.repository.findAllActive();
    return branches.map((branch) => toBranchResponse(branch));
  }

  public async getOne(id: number): Promise<BranchResponseDto> {
    return toBranchResponse(await this.findOrFail(id));
  }

  // ================== CREATE ==================
  public async create(body: CreateBranchDto): Promise<BranchResponseDto> {
    const branch = await this.repository.create({
      name: body.name,
      description: body.description ?? null,
      status: body.status ?? "active",
    });
    return toBranchResponse(branch);
  }

  // ================== UPDATE ==================
  public async updatePut(id: number, body: UpdateBranchDto): Promise<BranchResponseDto> {
    const branch = await this.findOrFail(id);
    await this.repository.update(branch, {
      name: body.name,
      description: body.description ?? null,
    });
    return toBranchResponse(branch);
  }

  public async updatePatch(id: number, body: PatchBranchDto): Promise<BranchResponseDto> {
    const branch = await this.findOrFail(id);
    await this.repository.update(branch, body);
    return toBranchResponse(branch);
  }

  // ================== DELETE ==================
  /** Eliminación física. */
  public async deletePhysical(id: number): Promise<void> {
    // onlyActive: false -> también permite purgar un registro ya desactivado.
    const branch = await this.findOrFail(id, false);
    await this.repository.delete(branch);
  }

  /** Eliminación lógica -> status = inactive. */
  public async deleteLogical(id: number): Promise<BranchResponseDto> {
    const branch = await this.findOrFail(id);
    await this.repository.update(branch, { status: "inactive" });
    return toBranchResponse(branch);
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
  private async findOrFail(id: number, onlyActive = true): Promise<Branch> {
    const branch = await this.repository.findById(id);
    if (!branch || (onlyActive && branch.status !== "active")) {
      throw new AppError(404, "Branch not found");
    }
    return branch;
  }
}
