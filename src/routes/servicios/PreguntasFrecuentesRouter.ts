import { Router } from "express";
import { PreguntasFrecuentesController } from "../../controllers/matriculados/servicios/PreguntasFrecuentesController";

export class PreguntasFrecuentesRouter {
  private controller: PreguntasFrecuentesController;
  private prefix: string = "/servicios/preguntas-frecuentes";

  constructor() {
    this.controller = new PreguntasFrecuentesController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.get(`${this.prefix}/categorias`, this.controller.getAllCategorias);
   /*  router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setActive);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete); */
  }
}