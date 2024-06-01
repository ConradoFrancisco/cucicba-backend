import { Router } from "express";
import noticiasController from "../../controllers/noticias/NoticiasController";

export const noticiasRoutes = Router();

noticiasRoutes.get('/',noticiasController.getAll);
noticiasRoutes.get('/:id',noticiasController.getById);
noticiasRoutes.patch('/:id',noticiasController.setActive);
noticiasRoutes.post('/',noticiasController.create)
noticiasRoutes.post('/images/',noticiasController.createImagesRegister)