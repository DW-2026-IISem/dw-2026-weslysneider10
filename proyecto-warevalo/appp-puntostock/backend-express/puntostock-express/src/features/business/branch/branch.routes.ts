import { Application } from "express";
import { BranchController } from "./branch.controller";

export class BranchRoutes {
  public branchController: BranchController = new BranchController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================
    // (rellenar en los siguientes pasos)
  }
}
