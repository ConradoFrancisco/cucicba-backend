import { Request, Response } from "express";
import * as yup from 'yup'
import InmobiliariasIlegalesPenalModel from "../../../models/matriculados/servicios/InmobiliariasIlegalesPenalModel";
const AutoridadSchema = yup.object().shape({
  nombre: yup.string().required(),
  fecha: yup.string().required(),
  direccion: yup.string().required(),
});
class InmobiliariasIlegalesPenalController {
  public async getAll(req: Request, res: Response) {
    let params = {};
    const input = req.query.input;
    const fecha = parseInt(req.query.fecha as string)
    const puesto = parseInt(req.query.puesto as string)
    console.log(fecha);
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
    if (fecha) {
      params = Object.assign({ fecha }, params);
    }
    if (input) {
      params = Object.assign({ input }, params);
    }
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
      const result = await InmobiliariasIlegalesPenalModel.getAll(params);
      res.json(result);
    } catch (e) {
      console.error("error al obtener las inmobiliarias Ilegales", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async getAllNoCausa(req: Request, res: Response) {
    let params = {};
    const input = req.query.input;
    const fecha = parseInt(req.query.fecha as string)
    const puesto = parseInt(req.query.puesto as string)
    console.log(fecha);
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
    if (fecha) {
      params = Object.assign({ fecha }, params);
    }
    if (input) {
      params = Object.assign({ input }, params);
    }
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
      const result = await InmobiliariasIlegalesPenalModel.getAllNoCausa(params);
      res.json(result);
    } catch (e) {
      console.error("error al obtener las inmobiliarias Ilegales", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async create(req: Request, res: Response) {
    const { nombre,fecha,direccion} = req.body;
    const causa = parseInt(req.body.causa as string);
    console.log("aca",req.body.direccion)
    try {
      // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
      await AutoridadSchema.validate({ nombre,fecha,direccion,causa });

      // Si la validación pasa, crear el registro en la base de datos
      await InmobiliariasIlegalesPenalModel.create({ nombre,fecha,direccion:direccion,causa});
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
  public async createNoCausa(req: Request, res: Response) {
    const { nombre,fecha,direccion } = req.body;
    try {
      // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
      await AutoridadSchema.validate({ nombre,fecha,direccion });

      // Si la validación pasa, crear el registro en la base de datos
      await InmobiliariasIlegalesPenalModel.create({ nombre,fecha,direccion:direccion,causa:0});
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
      const result = await InmobiliariasIlegalesPenalModel.setActive({id,estado})
      res.status(200).send("Inmobiliaria Ilegal Publicada");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    try {
      const result = await InmobiliariasIlegalesPenalModel.delete({id})
      res.status(200).send("Inmobiliaria ilegal eleminada con éxito");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const { nombre,direccion,fecha } = req.body;
    try {
      await InmobiliariasIlegalesPenalModel.update({ id,nombre,direccion:direccion,fecha,causa:1 });
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
  public async updateNoCausa(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const { nombre,direccion,fecha } = req.body;
    try {
      await InmobiliariasIlegalesPenalModel.update({ id,nombre,direccion:direccion,fecha,causa:0 });
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
export default new InmobiliariasIlegalesPenalController();
