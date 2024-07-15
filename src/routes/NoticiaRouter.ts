import { Router } from "express";
import { AreasController } from "../controllers/AreasController";
import { NoticiaController } from "../controllers/NoticiaController";

export class NoticiaRouter {
  private controller: NoticiaController;
  private prefix: string = "/noticia";

  constructor() {
    this.controller = new NoticiaController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setState);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete);
  }
}
