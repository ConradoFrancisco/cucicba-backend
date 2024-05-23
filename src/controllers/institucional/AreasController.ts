import { Request, Response } from "express";
import * as yup from "yup";
import AreasModel from "../../models/institucional/AreasModel";
const areaSchema = yup.object().shape({
  title: yup.string().required(),
  orden: yup.number().required().integer().positive(),
});
class AreasController {
  public async getAll(req: Request, res: Response) {
    let params = {};
    const input = `%${req.query.input as string}%`;
    const offset = parseInt(req.query.offset as string)
    const limit = parseInt(req.query.limit as string)
    const active = parseInt(req.query.active as string)
    if (input) {
      params = Object.assign({ input }, params);
    }
    if (active) {
      params = Object.assign({ active }, params);
    }
    if (offset) {
      params = Object.assign({ offset }, params);
    }
    if (limit) {
      params = Object.assign({ limit }, params);
    }
    try {
      const results = await AreasModel.getAll(params);
      res.json(results);
    } catch (e) {
      console.error("error al obtener las areas", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async create(req: Request, res: Response) {
    const { title } = req.body;
    const orden = parseInt(req.body.orden as string)
    try {
      // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
      await areaSchema.validate({ title, orden });
  
      // Si la validación pasa, crear el registro en la base de datos
      await AreasModel.create({ title, orden });
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e :any) {
      // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
      if (e.name === 'ValidationError') {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
      console.error(e);
    }
  }
  public async setActive(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const estado = req.body.estado
    try {
      const result = await AreasModel.setActive({id,estado})
      res.status(200).send("Area publicada satisfactoriamente!");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }

  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const title = req.body.title
    const orden = parseInt(req.body.orden as string)
    await areaSchema.validate({ title, orden });
    try {
      const result = await AreasModel.update({id,title,orden})
      res.status(200).send("Area modificada satisfactoriamente!");
      return res.json(result)
    } catch (e :any) {
      // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
      if (e.name === 'ValidationError') {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
      console.error(e);
    }
  }

  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    try {
      const result = await AreasModel.delete({id})
      res.status(200).send("Area eliminada satisfactoriamente!");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }


}
export default new AreasController();
