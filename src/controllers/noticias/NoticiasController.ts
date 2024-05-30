import { Request, Response } from "express";
import noticiasModel from "../../models/noticias/NoticiasModel";
import * as Yup from 'yup'
const noticiaSchema = Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
    date: Yup.date().required("La fecha es requerida"),
    orden: Yup.number().required("El orden es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    content: Yup.string().required("El cuerpo de la noticia es requerido"),
});
class NoticiasController {
    public async getAll(req: Request, res: Response) {
        try {
            const response = await noticiasModel.getAll({});
            res.status(200)
            res.json(response)
        } catch (e) {
            console.error("error al obtener las noticias", e);
            res.status(500).send("error en el servidor");
        }
    }
    public async create(req: Request, res: Response) {
        const { date, title, description, body } = req.body;
        const orden = parseInt(req.body.orden as string);
        try {
            await noticiaSchema.validate({ title,date,orden, description,content:body });
            const insertId = await noticiasModel.create({ date, title, description, body, orden });
            
            res.status(201).json({ message: 'Noticia creada', insertId: insertId });
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
    public async createImagesRegister(req:Request,res:Response){
        const files : any = req.body.files;
        const id = parseInt(req.body.id as string);
        try{
            await noticiasModel.createImagesRegister({id_noticia:id,filePaths:files})
            res.status(201).json({ message: 'Noticia creada e imagenes subidas correctamente!'})
        }catch(e){
            res.status(500).json({ error: "Error del servidor" });
            throw new Error("error al subir las imagenes a la db")
        }
    }
}
export default new NoticiasController();