import { Request, Response } from "express";
import * as yup from "yup";
import SancionesModel from "../../../models/matriculados/servicios/sanciones_tribunal/SancionesModel";


const SancionSchema = yup.object().shape({
  categoria: yup.number().required(),
  fecha: yup.string().required(),
  descripcion: yup.string().required(),
  pdf: yup.string().required(),
});
class SancionesController {
  public async getAll(req: Request, res: Response) {
    let params = {};
    const input = req.query.input;
    const fecha = parseInt(req.query.fecha as string);
    const categoria = parseInt(req.query.categoria as string);
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
    if (categoria) {
        params = Object.assign({ categoria }, params);
      }
    try {
      const result = await SancionesModel.getAll(params);
      res.json(result);
    } catch (e) {
      console.error("error al obtener las inmobiliarias Ilegales", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async getCategorias(req:Request,res:Response){
    try {
        const result = await SancionesModel.getCategorys();
        res.json(result);
      } catch (e) {
        console.error("error al obtener las categorias");
        res.status(500).send("error en el servidor");
      }
  }

  public async create(req: Request, res: Response) {
    const { descripcion, fecha, pdf } = req.body;
    const categoria = parseInt(req.body.categoria as string);
    try {
      // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
      await SancionSchema.validate({ descripcion, fecha, pdf, categoria });

      // Si la validación pasa, crear el registro en la base de datos
      await SancionesModel.create({ categoria, descripcion, fecha, pdf });
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
      const result = await SancionesModel.setActive({ id, estado });
      res.status(200).send("Inmobiliaria Ilegal Publicada");
      return res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    try {
      const result = await SancionesModel.delete({ id });
      res.status(200).send("Inmobiliaria ilegal eleminada con éxito");
      return res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const { descripcion, fecha, pdf } = req.body;
    const categoria = parseInt(req.body.categoria as string);
    try {
      await SancionesModel.update({ categoria_sancion_id:categoria, descripcion, fecha, id, pdf });
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
export default new SancionesController();
