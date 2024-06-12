import { Router } from "express";
import noticiasController from "../../controllers/noticias/NoticiasController";

export const noticiasRoutes = Router();

noticiasRoutes.get('/',noticiasController.getAll);
noticiasRoutes.get('/:id',noticiasController.getById);
noticiasRoutes.patch('/:id',noticiasController.setActive);
noticiasRoutes.patch('/modificar/:id',noticiasController.update);
noticiasRoutes.delete('/:id',noticiasController.delete)
noticiasRoutes.post('/',noticiasController.create)
noticiasRoutes.post('/images/',noticiasController.createImagesRegister)