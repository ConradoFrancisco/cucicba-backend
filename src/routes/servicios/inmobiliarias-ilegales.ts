import { Router } from "express";
import { InmobiliariaIlegalController } from "../../controllers/matriculados/servicios/InmobiliariaIlegalController";

export class InmobiliariasRouter {
  private controller: InmobiliariaIlegalController;
  private prefix: string = "/servicios/inmobiliarias-ilegales";

  constructor() {
    this.controller = new InmobiliariaIlegalController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setActive);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete);
  }
}

/* import {Router} from 'express';
import InmobiliariasIlegalesPenalController from '../controllers/matriculados/servicios/InmobiliariasIlegalesPenalController';


const inmobiliariasPenalRoutes = Router();

inmobiliariasPenalRoutes.get('/',InmobiliariasIlegalesPenalController.getAll)
inmobiliariasPenalRoutes.get('/no-causa/',InmobiliariasIlegalesPenalController.getAllNoCausa)
inmobiliariasPenalRoutes.post('/',InmobiliariasIlegalesPenalController.create)
inmobiliariasPenalRoutes.patch("/:id", InmobiliariasIlegalesPenalController.setActive);
inmobiliariasPenalRoutes.patch("/modificar/:id", InmobiliariasIlegalesPenalController.update);
inmobiliariasPenalRoutes.patch("/no-causa/modificar/:id", InmobiliariasIlegalesPenalController.updateNoCausa);
inmobiliariasPenalRoutes.delete("/:id", InmobiliariasIlegalesPenalController.delete);

export default inmobiliariasPenalRoutes; */
