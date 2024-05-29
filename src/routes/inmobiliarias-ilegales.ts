import {Router} from 'express';
import InmobiliariasIlegalesPenalController from '../controllers/matriculados/servicios/InmobiliariasIlegalesPenalController';


const inmobiliariasPenalRoutes = Router();

inmobiliariasPenalRoutes.get('/',InmobiliariasIlegalesPenalController.getAll)
inmobiliariasPenalRoutes.get('/no-causa/',InmobiliariasIlegalesPenalController.getAllNoCausa)
inmobiliariasPenalRoutes.post('/',InmobiliariasIlegalesPenalController.create)
inmobiliariasPenalRoutes.patch("/:id", InmobiliariasIlegalesPenalController.setActive);
inmobiliariasPenalRoutes.patch("/modificar/:id", InmobiliariasIlegalesPenalController.update);
inmobiliariasPenalRoutes.patch("/no-causa/modificar/:id", InmobiliariasIlegalesPenalController.updateNoCausa);
inmobiliariasPenalRoutes.delete("/:id", InmobiliariasIlegalesPenalController.delete);

export default inmobiliariasPenalRoutes;