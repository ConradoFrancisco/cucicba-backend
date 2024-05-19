import { Request, Response } from "express";
import BibliotecaDigitalModel from "../../../models/matriculados/servicios/BibliotecaDigitalModel";

 class BibliotecaDigitalController {
   async getAll(req: Request, res: Response): Promise<void> {
    const category = parseInt(req.query.category as string, 10); 
    try {
      const publicaciones = await BibliotecaDigitalModel.getAll({ category });
      res.json(publicaciones);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}
export default new BibliotecaDigitalController()