import { Router } from "express";
import AreasController from "../../controllers/institucional/AreasController";

export const areasRoutes = Router();

areasRoutes.get("/", AreasController.getAll);
areasRoutes.post("/", AreasController.create);
areasRoutes.patch("/:id", AreasController.setActive);
areasRoutes.delete("/:id", AreasController.delete);
