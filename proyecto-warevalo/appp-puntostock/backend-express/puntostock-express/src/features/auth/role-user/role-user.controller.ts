import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { CreateRoleUserDto } from "./dto";
import { RoleUserService } from "./role-user.service";
import { requireAuthUser } from "../../../shared/auth/auth-user";

/**
 * Capa Controller del feature RoleUser.
 * No expone borrado físico: la revocación es lógica para preservar auditoría.
 */
export class RoleUserController extends BaseController {
  public constructor(
    private readonly service: RoleUserService = new RoleUserService()
  ) {
    super();
  }

  // ================== READ ==================
  public async getAll(_req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const assignments = await this.service.getAll();
      res.status(200).json({ assignments });
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const assignment = await this.service.getOne(this.paramId(req));
      res.status(200).json({ assignment });
    });
  }

  // ================== CREATE (asignar) ==================
  public async assign(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const assignment = await this.service.assign(req.body as CreateRoleUserDto);
      res.status(201).json({ assignment });
    });
  }

  // ================== STATE ==================
  /** Retirar el rol (borrado lógico). */
  public async deactivate(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const assignment = await this.service.deactivate(this.paramId(req));
      res.status(200).json({ message: "Role assignment deactivated", assignment });
    });
  }

  /** Reactivar la asignación. */
  public async reactivate(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const assignment = await this.service.reactivate(this.paramId(req));
      res.status(200).json({ message: "Role assignment reactivated", assignment });
    });
  }

  // ================== ROLES DE UN USUARIO (casillas) ==================
  /** GET /api/usuarios/:id/roles -> { user_id, role_ids } */
  public async getUserRoles(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const userId = this.paramId(req);
      const role_ids = await this.service.getRoleIdsForUser(userId);
      res.status(200).json({ user_id: userId, role_ids });
    });
  }

  /** PUT /api/usuarios/:id/roles  body { role_ids: number[] } -> { user_id, role_ids } */
  public async setUserRoles(req: Request, res: Response): Promise<void> {
    await this.run(res, async () => {
      const userId = this.paramId(req);
      const role_ids = await this.service.setUserRoles(
        userId,
        req.body?.role_ids,
        requireAuthUser(req).id
      );
      res.status(200).json({ user_id: userId, role_ids });
    });
  }
}
