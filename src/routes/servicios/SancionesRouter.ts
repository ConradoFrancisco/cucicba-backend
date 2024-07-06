import { Router } from "express";
import { SancionesController } from "../../controllers/matriculados/servicios/SancionesController";

export class SancionesRouter {
  private controller: SancionesController;
  private prefix: string = "/servicios/sanciones";

  constructor() {
    this.controller = new SancionesController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.get(`${this.prefix}/categorias`, this.controller.getAllCategorias);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setState);
    /* router.patch(`${this.prefix}/delete/:id`, this.controller.delete); */
  }
}
