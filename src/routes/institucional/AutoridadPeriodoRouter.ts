import { Router } from "express";
import { AutoridadEticaController } from "../../controllers/institucional/TribunalController";
import { PeriodoController } from "../../controllers/institucional/PeriodoController";

export class AutoridadPeriodoRouter {
  private controller: PeriodoController;
  private prefix: string = "/institucional/autoridad/periodo";

  constructor() {
    this.controller = new PeriodoController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.get(`${this.prefix}/actual`, this.controller.getOneByDate);
  }
}
