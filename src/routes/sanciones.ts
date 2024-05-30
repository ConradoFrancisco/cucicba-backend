import { Router } from "express";
import SancionesController from "../controllers/matriculados/servicios/SancionesController";

export const sancionesRouter = Router();

sancionesRouter.get('/',SancionesController.getAll);
sancionesRouter.get('/categorias',SancionesController.getCategorias);
sancionesRouter.post('/',SancionesController.create);
sancionesRouter.patch('/:id',SancionesController.setActive)
sancionesRouter.delete('/:id',SancionesController.delete)
sancionesRouter.patch('/modificar/:id',SancionesController.update)