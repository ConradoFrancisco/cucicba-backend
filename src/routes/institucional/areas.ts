import { Router } from "express";
import AreasController from "../../controllers/AreasController";

export const areasRoutes = Router();

areasRoutes.get("/", AreasController.getAll);
areasRoutes.get("/select", AreasController.getAreasNames);
areasRoutes.post("/", AreasController.create);
areasRoutes.patch("/:id", AreasController.setActive);
areasRoutes.patch("/modificar/:id", AreasController.update);
areasRoutes.delete("/:id", AreasController.delete);
