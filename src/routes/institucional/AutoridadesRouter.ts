import { Router } from "express";
import { AutoridadController } from "../../controllers/institucional/AutoridadesController";

export class AutoridadesRouter {
  private controller: AutoridadController;
  private prefix: string = "/institucional/autoridad";

  constructor() {
    this.controller = new AutoridadController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.get(`${this.prefix}/cargos`, this.controller.getCargos);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setActive);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete);
  }
}
