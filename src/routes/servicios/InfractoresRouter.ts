import { Router } from "express";
import { InfractorController } from "../../controllers/matriculados/servicios/InfractorController";

export class InfractoresRouter {
  private controller: InfractorController;
  private prefix: string = "/servicios/infractores";

  constructor() {
    this.controller = new InfractorController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setActive);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete);
  }
}
