import { Request, Response } from "express";
import RevistaCucicbaModel from "../../../models/matriculados/servicios/revista_cucicba/RevistaCucicbaModel";
import * as yup from "yup";
const revistaSchema = yup.object().shape({
  nombre: yup.string().required(),
  apellido: yup.string().required(),
  orden: yup.number().required().integer().positive(),
  posicion: yup.string().required(),
});
class RevistaCucicbaController {
  public async getAll(req: Request, res: Response) {
    let params = {};
    const input = req.query.input;

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
      const result = await RevistaCucicbaModel.getAll(params);
      res.json(result);
    } catch (e) {
      console.error("error al obtener las autoridades", e);
      res.status(500).send("error en el servidor");
    }
  }

  public async create(req: Request, res: Response) {
    const { portada, archivo } = req.body;
    try {
      // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
      await revistaSchema.validate({ portada, archivo });

      // Si la validación pasa, crear el registro en la base de datos
      await RevistaCucicbaModel.create({ portada, archivo });
      res.status(201).send("Revista creada satisfactoriamente!");
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
      const result = await RevistaCucicbaModel.setActive({ id, estado });
      res.status(200).send("Revista publicada!");
      return res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    try {
      const result = await RevistaCucicbaModel.delete({ id });
      res.status(200).send("Revista eliminada satisfactoriamente!");
      return res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const { portada, archivo } = req.body;
    try {
      await RevistaCucicbaModel.update({ id, portada, archivo });
      res.status(201).send("Revista Modificada correctamente!");
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

export default new RevistaCucicbaController();
