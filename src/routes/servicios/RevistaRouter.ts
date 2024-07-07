import { Router } from "express";
import { RevistaController } from "../../controllers/matriculados/servicios/RevistaCucicbaController";

export class RevistaRouter {
  private controller: RevistaController;
  private prefix: string = "/servicios/revista";

  constructor() {
    this.controller = new RevistaController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setState);
  }
}
