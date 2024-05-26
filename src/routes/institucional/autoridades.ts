import {Router} from 'express';
import AutoridadesController from '../../controllers/institucional/AutoridadesController';


const autoridadesRoutes = Router();

autoridadesRoutes.get('/',AutoridadesController.getAll)
autoridadesRoutes.post('/',AutoridadesController.create)
autoridadesRoutes.patch("/:id", AutoridadesController.setActive);
autoridadesRoutes.patch("/modificar/:id", AutoridadesController.update);
autoridadesRoutes.delete("/:id", AutoridadesController.delete);
autoridadesRoutes.get('/cargos',AutoridadesController.getCargos)

export default autoridadesRoutes