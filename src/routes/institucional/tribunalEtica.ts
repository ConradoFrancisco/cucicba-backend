import { Router } from "express";
import TribunalController from "../../controllers/institucional/TribunalController";

export const tribunal_etica_routes = Router();

tribunal_etica_routes.get('/',TribunalController.getAll);
tribunal_etica_routes.post('/',TribunalController.create);
tribunal_etica_routes.patch('/:id',TribunalController.setActive);
tribunal_etica_routes.patch('/modificar/:id',TribunalController.update);
tribunal_etica_routes.delete('/:id',TribunalController.delete);