import { Request, Response } from "express";
import noticiasModel from "../../models/noticias/NoticiasModel";
import * as Yup from "yup";
import NoticiasModel from "../../models/noticias/NoticiasModel";
const noticiaSchema = Yup.object().shape({
  title: Yup.string().required("El título es requerido"),
  date: Yup.date().required("La fecha es requerida"),
  orden: Yup.number().required("El orden es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  content: Yup.string().required("El cuerpo de la noticia es requerido"),
});
class NoticiasController {
  public async getAll(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string);
    const estado = parseInt(req.query.estado as string);
    const offset = parseInt(req.query.offset as string);
    const input = req.query.input as string;
    let params = {};
    if (limit) {
      params = Object.assign({ limit }, params);
    }
    if (input) {
      params = Object.assign({ input }, params);
    }
    if (offset) {
      params = Object.assign({ offset }, params);
    }
    if (estado || estado === 0) {
      params = Object.assign({ estado }, params);
    }
    try {
      const response = await noticiasModel.getAll(params);
      res.status(200);
      res.json(response);
    } catch (e) {
      console.error("error al obtener las noticias", e);
      res.status(500).send("error en el servidor");
    }
  }

  public async deleteImage(req: Request, res: Response){
    const { id } = req.params;
    try {
      await NoticiasModel.deleteImage({ id: parseInt(id) });
      res.status(200).send({ message: 'Imagen eliminada con éxito' });
    } catch (error) {
      res.status(500).send({ error: 'Error al eliminar la imagen' });
    }
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    console.log("aca",id);
    try {
      const response = await noticiasModel.getById({ id });
      res.status(200);
      res.json(response);
    } catch (e) {
      console.error("error al obtener las noticias", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async create(req: Request, res: Response) {
    const { date, title, description, body } = req.body;
    const orden = parseInt(req.body.orden as string);
    try {
      await noticiaSchema.validate({
        title,
        date,
        orden,
        description,
        content: body,
      });
      const insertId = await noticiasModel.create({
        date,
        title,
        description,
        body,
        orden,
      });

      res.status(201).json({ message: "Noticia creada", insertId: insertId });
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
  public async createImagesRegister(req: Request, res: Response) {
    const files: any = req.body.files;
    const id = parseInt(req.body.id as string);
    try {
      await noticiasModel.createImagesRegister({
        id_noticia: id,
        filePaths: files,
      });
      res
        .status(201)
        .json({ message: "Noticia creada e imagenes subidas correctamente!" });
    } catch (e) {
      res.status(500).json({ error: "Error del servidor" });
      throw new Error("error al subir las imagenes a la db");
    }
  }
  public async setActive(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const estado = req.body.estado
    try {
      const result = await NoticiasModel.setActive({id,estado})
      res.status(200).send("Noticia Publicada satisfactoriamente!");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    try {
      const result = await NoticiasModel.delete({ id });
      res.status(200).send("Noticia eleminada con éxito");
      return res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { date, title, description, body, orden, filePaths } = req.body;

    try {
      // Actualizar la noticia y sus imágenes (si se proporcionan)
      const updatedNoticia = await noticiasModel.updatear({
        id: parseInt(id),
        date,
        title,
        description,
        body,
        orden,
        filePaths,
      });

      res.status(200).json({ message: "Noticia actualizada", updatedNoticia });
    } catch (e: any) {
      // Manejar errores de validación y otros errores
      if (e.name === "ValidationError") {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: "Error del servidor" });
      }
      console.error(e);
    }
  }

}
export default new NoticiasController();
