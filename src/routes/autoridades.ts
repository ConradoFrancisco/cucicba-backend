import {Request, Response, Router} from 'express';
import { getCon } from '../models/AutoridadesModel';

const autoridadesRoutes = Router();

autoridadesRoutes.get('/',getCon)

export default autoridadesRoutes