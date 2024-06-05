import {Router} from 'express';
import InfractoresController from '../controllers/matriculados/servicios/InfractoresController';



const infractoresRoutes = Router();

infractoresRoutes.get('/',InfractoresController.getAll)
infractoresRoutes.post('/',InfractoresController.create)
infractoresRoutes.patch("/:id", InfractoresController.setActive);
infractoresRoutes.patch("/modificar/:id", InfractoresController.update);
infractoresRoutes.delete("/:id", InfractoresController.delete);

export default infractoresRoutes;