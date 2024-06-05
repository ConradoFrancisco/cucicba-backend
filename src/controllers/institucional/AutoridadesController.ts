import { Request, Response } from "express";
import AutoridadesModel from "../../models/institucional/autoridad/AutoridadesModel";
import * as yup from "yup";
const AutoridadSchema = yup.object().shape({
  nombre: yup.string().required(),
  apellido: yup.string().required(),
  puesto: yup.number().required().integer().positive(),
  avatar: yup.string().required(),
});
class AutoridadesController {
  public async getAll(req: Request, res: Response) {
    let params = {};
    const input = req.query.input;
    const orden = parseInt(req.query.orden as string);
    const puesto = parseInt(req.query.puesto as string);
    console.log(orden);
    const orderDirection =
      (req.query.orderDirection as "ASC" | "DESC") || "ASC";
    const orderBy = (req.query.orderBy as string) || "orden";
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
      params = Object.assign({ puesto_id: puesto }, params);
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
      const result = await AutoridadesModel.getAll(params);
      res.json(result);
    } catch (e) {
      console.error("error al obtener las autoridades", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async getCargos(req: Request, res: Response) {
    try {
      const result = await AutoridadesModel.getCargos();
      res.json(result);
    } catch (e) {
      console.error("error al obtener los cargos");
      res.status(500).send("error en el servidor");
    }
  }
  public async create(req: Request, res: Response) {
    const { nombre, apellido, avatar } = req.body;
    const puesto = parseInt(req.body.puesto as string);
    const orden = parseInt(req.body.orden as string);
    try {
      // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
      await AutoridadSchema.validate({
        nombre,
        apellido,
        avatar,
        puesto,
        orden,
      });

      // Si la validación pasa, crear el registro en la base de datos
      await AutoridadesModel.create({
        nombre,
        apellido,
        avatar,
        puesto,
        orden,
      });
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
    const id = parseInt(req.params.id as string);
    const estado = req.body.estado;
    try {
      const result = await AutoridadesModel.setActive({ id, estado });
      res.status(200).send("Autoridad dada de alta!");
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    try {
      const result = await AutoridadesModel.delete({ id });
      res.status(200).send("Autoridad eliminada satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const { nombre, apellido, avatar } = req.body;
    const puesto_id = parseInt(req.body.puesto as string);
    const orden = parseInt(req.body.orden as string);
    try {
      await AutoridadesModel.update({
        id,
        nombre,
        apellido,
        avatar,
        puesto_id,
        orden,
      });
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
export default new AutoridadesController();
