import { Router } from "express";
import {AreasController} from "../controllers/AreasController";

export class AreasRouter {
  private controller: AreasController;
  private prefix: string = "/areas";

  constructor() {
    this.controller = new AreasController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.get);
  }
}