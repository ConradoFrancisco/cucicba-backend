import { Request, Response } from "express";
import AutoridadesModel from "../../models/AutoridadesModel";
import * as yup from 'yup'
import ComisionRevisadoraModel from "../../models/ComisionRevisadoraModel";
const AutoridadSchema = yup.object().shape({
  nombre: yup.string().required(),
  apellido: yup.string().required(),
  orden: yup.number().required().integer().positive(),
  posicion:yup.string().required(),
});
class ComisionRevisadora {
  public async getAll(req: Request, res: Response) {
    let params = {};
    const input = req.query.input;
    const orden = parseInt(req.query.orden as string)
    const puesto = parseInt(req.query.puesto as string)
    console.log(orden);
    const orderDirection =
    (req.query.orderDirection as "ASC" | "DESC") || "ASC";
    const orderBy = (req.query.orderBy as string) || "id";
    const estado = parseInt(req.query.estado as string);
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    
    if (orderBy) {
      params = Object.assign({ orderBy }, params);
    }
    if (orderDirection) {
      params = Object.assign({ orderDirection }, params);
    }
    if (orden) {
      params = Object.assign({ orden }, params);
    }
    if (puesto) {
      params = Object.assign({ puesto_id:puesto }, params);
    }
    if (input) {
      params = Object.assign({ input }, params);
    }
    console.log(input)
    if (estado || estado === 0) {
      params = Object.assign({ estado }, params);
    }
    if (limit) {
      params = Object.assign({ limit }, params);
    }
    if (offset) {
      params = Object.assign({ offset }, params);
    }
    try {
      const result = await ComisionRevisadoraModel.getAll(params);
      res.json(result);
    } catch (e) {
      console.error("error al obtener las autoridades", e);
      res.status(500).send("error en el servidor");
    }
  }

  public async create(req: Request, res: Response) {
    const { nombre,apellido,posicion } = req.body;
    const puesto = parseInt(req.body.puesto as string);
    const orden = parseInt(req.body.orden as string);
    try {
      // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
      await AutoridadSchema.validate({ nombre,apellido,orden,posicion });

      // Si la validación pasa, crear el registro en la base de datos
      await ComisionRevisadoraModel.create({ nombre,apellido,orden,posicion });
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
      const result = await ComisionRevisadoraModel.setActive({id,estado})
      res.status(200).send("Autoridad dada de alta!");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    try {
      const result = await ComisionRevisadoraModel.delete({id})
      res.status(200).send("Autoridad eliminada satisfactoriamente!");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const { nombre,apellido,posicion } = req.body;
    const puesto_id = parseInt(req.body.puesto as string);
    const orden = parseInt(req.body.orden as string);
    try {
      await ComisionRevisadoraModel.update({ id,nombre,apellido,orden,posicion });
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
export default new ComisionRevisadora();
