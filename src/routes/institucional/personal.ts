import { Router } from "express";
import PersonalController from "../../controllers/institucional/PersonalController";

export const personalRoutes = Router();

personalRoutes.get('/',PersonalController.getAll)
personalRoutes.post('/',PersonalController.create)
personalRoutes.patch("/:id", PersonalController.setActive);
personalRoutes.patch("/modificar/:id", PersonalController.update);
personalRoutes.delete("/:id", PersonalController.delete);