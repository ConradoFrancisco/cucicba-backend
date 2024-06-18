import { Router } from "express";
import {AreasController} from "../controllers/AreasController";

export class AreasRouter {
  private controller: AreasController;
  private prefix: string = "/areas";

  constructor() {
    this.controller = new AreasController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setActive);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete);
  }
}