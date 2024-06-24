import { Request, Response } from "express";
import { PreguntaFrecuenteService } from "../../../services/servicios/PreguntaFrecuenteService";
import { ParamsDto } from "../../../dtos/ParamsDto";

export class PreguntasFrecuentesController {
  private static service: PreguntaFrecuenteService = new PreguntaFrecuenteService();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paramsDto: ParamsDto = new ParamsDto(req.query);
      const result = await PreguntasFrecuentesController.service.getAll(paramsDto);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
  public async getAllCategorias(req: Request, res: Response) : Promise<void>{
    try{
      const result = await PreguntasFrecuentesController.service.getAllCategorias();
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
}
  /* public async getCategorys(req: Request, res: Response) {
    try {
      const results = await PreguntasFrecuentesModel.getCategorys();
      res.json(results);
    } catch (e) {
      console.error("Error al obtener las categorias, intentelo mas tarde");
      res.status(500).send("arror intero del servidor");
    }
  }
  public async create(req: Request, res: Response) {
    const {pregunta,respuesta} = req.body
    const categoria = parseInt(req.body.categoria)
    try {
      await PreguntasFrecuentesModel.create({pregunta,respuesta,categoria});
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e: any) {
      // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
      if (e.name === "ValidationError") {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: "Error del servidor" });
      }
      console.error(e);
    }
  }
  public async setActive(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const estado = req.body.estado
    try {
      const result = await PreguntasFrecuentesModel.setActive({id,estado})
      res.status(200).send("Pregunta Frecuente Publicada dada de alta!");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    try {
      const result = await PreguntasFrecuentesModel.delete({id})
      res.status(200).send("Pregunta eliminada satisfactoriamente!");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const {pregunta,respuesta} = req.body
    const categoria = parseInt(req.body.categoria)
    const id = parseInt(req.params.id as string)
    try {
      await PreguntasFrecuentesModel.update({ id,categoria,pregunta,respuesta});
      res.status(201).send("Registro Modificado correctamente!");
    } catch (e: any) {
      // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
      if (e.name === "ValidationError") {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: "Error del servidor" });
      }
      console.error(e);
    }
  }
}
 */
