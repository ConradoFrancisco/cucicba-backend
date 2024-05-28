import { Router } from "express";
import TribunalController from "../../controllers/institucional/TribunalController";
import ComisionRevisadoraController from "../../controllers/institucional/ComisionRevisadoraController";

export const comisionRevisadoraRoutes = Router();

comisionRevisadoraRoutes.get('/',ComisionRevisadoraController.getAll);
comisionRevisadoraRoutes.post('/',ComisionRevisadoraController.create);
comisionRevisadoraRoutes.patch('/:id',ComisionRevisadoraController.setActive);
comisionRevisadoraRoutes.patch('/modificar/:id',ComisionRevisadoraController.update);
comisionRevisadoraRoutes.delete('/:id',ComisionRevisadoraController.delete);