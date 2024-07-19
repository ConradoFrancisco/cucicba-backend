import { Router } from "express";
import { AutoridadRevisoraController } from "../../controllers/institucional/ComisionRevisadoraController";

export class AutoridadesRevisoraRouter {
  private controller: AutoridadRevisoraController;
  private prefix: string = "/institucional/revisora";

  constructor() {
    this.controller = new AutoridadRevisoraController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setActive);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete);
  }
}
