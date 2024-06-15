import { Router } from "express";
import {ServiciosController} from "../controllers/ServiciosController";

export class ServiciosRouter {
  private controller: ServiciosController;
  private prefix: string = "/servicios";

  constructor() {
    this.controller = new ServiciosController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
  }
}