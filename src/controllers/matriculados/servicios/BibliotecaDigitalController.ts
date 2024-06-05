import { Request, Response } from "express";
import BibliotecaDigitalModel from "../../../models/matriculados/servicios/Biblioteca/BibliotecaDigitalModel";
import * as Yup from 'yup'
const postSchema = Yup.object().shape({
  categoria_id: Yup.number().required("La categoria es requerida"),
  fecha: Yup.date().required("La fecha es requerida"),
  descripcion: Yup.string().required("La descripción es requerida"),
  archivo: Yup.string().required("El cuerpo de la noticia es requerido"),
});
 class BibliotecaDigitalController {
  public async getAll(req: Request, res: Response) {
    let params = {};
    const input = req.query.input;
    const fecha = parseInt(req.query.fecha as string)
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
      const result = await BibliotecaDigitalModel.getAll(params);
      res.json(result);
    } catch (e) {
      console.error("error al obtener las inmobiliarias Ilegales", e);
      res.status(500).send("error en el servidor");
    }
  }
  
  public async create(req: Request, res: Response) {
    const { pdf,descripcion,fecha} = req.body;
    const categoria_id = parseInt(req.body.categoria as string);    
    console.log(req.body);
    
    try {
      // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
      await postSchema.validate({ categoria_id,fecha,descripcion,archivo:pdf });

      // Si la validación pasa, crear el registro en la base de datos
      await BibliotecaDigitalModel.create({ categoria_id,fecha,descripcion,archivo:pdf});
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

  public async getAllCategories(req:Request,res:Response){
      try{
        const categorias = await BibliotecaDigitalModel.getAllCategories();
        res.json(categorias);
      }catch (e) {
        console.error("error al obtener las inmobiliarias Ilegales", e);
        res.status(500).send("error en el servidor");
      }
  }

  public async setActive(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const estado = req.body.estado
    try {
      const result = await BibliotecaDigitalModel.setActive({id,estado})
      res.status(200).send("Inmobiliaria Ilegal Publicada");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    console.log("hola")
    const id = parseInt(req.params.id as string)
    try {
      const result = await BibliotecaDigitalModel.delete({id})
      res.status(200).send("post eliminado con éxito");
      return res.json(result)
    } catch (e :any) {
        res.status(500).json({ error: "Error del servidor" });
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string)
    const { pdf,descripcion,date} = req.body;
    const categoria_id = parseInt(req.body.categoria_id as string);  
    try {
      await BibliotecaDigitalModel.update({ id,categoria_id,fecha:date,descripcion,archivo:pdf });
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
export default new BibliotecaDigitalController()