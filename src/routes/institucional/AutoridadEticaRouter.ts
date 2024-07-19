import { Router } from "express";
import { AutoridadEticaController } from "../../controllers/institucional/TribunalController";

export class AutoridadesEticaRouter {
  private controller: AutoridadEticaController;
  private prefix: string = "/institucional/etica";

  constructor() {
    this.controller = new AutoridadEticaController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setActive);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete);
  }
}
