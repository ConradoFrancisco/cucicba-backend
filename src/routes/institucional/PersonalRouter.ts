import { Router } from "express";
import { PersonalController } from "../../controllers/institucional/PersonalController";

export class PersonalRouter {
  private controller: PersonalController;
  private prefix: string = "/institucional/personal";

  constructor() {
    this.controller = new PersonalController();
  }

  public routes(router: Router): void {
    router.get(`${this.prefix}`, this.controller.getAll);
    router.get(`${this.prefix}/front`, this.controller.getByAreas);
    router.post(`${this.prefix}`, this.controller.create);
    router.patch(`${this.prefix}/:id`, this.controller.update);
    router.patch(`${this.prefix}/active/:id`, this.controller.setActive);
    router.patch(`${this.prefix}/delete/:id`, this.controller.delete);
  }
}
