import { Router } from "express";
import PersonalController from "../../controllers/institucional/PersonalController";

export const personalRoutes = Router();

personalRoutes.get('/',PersonalController.getAll)