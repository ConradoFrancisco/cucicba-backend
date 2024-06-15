import { Request, Response } from "express";
import AreaService from "../services/AreaService";

export class AreasController {

  private static service: AreaService = new AreaService();

  public async get(req: Request, res: Response):Promise<void> {
    try {
      const result = await AreasController.service.getAll();
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  }

  // public async getAll(req: Request, res: Response) {
  //   let params = {};
  //   const input = req.query.input as string;
  //   const estado = parseInt(req.query.estado as string);
  //   const orderDirection =
  //     (req.query.orderDirection as "ASC" | "DESC") || "ASC";
  //   const orden = parseInt(req.query.orden as string);
  //   const offset = parseInt(req.query.offset as string);
  //   const orderBy = (req.query.orderBy as string) || "id";
  //   console.log(orderBy);
  //   console.log(orderDirection);
  //   const limit = parseInt(req.query.limit as string);

  //   if (input) {
  //     params = Object.assign({ input }, params);
  //   }
  //   if (estado || estado === 0) {
  //     params = Object.assign({ estado }, params);
  //   }
  //   if (orden) {
  //     params = Object.assign({ orden }, params);
  //   }
  //   if (offset) {
  //     params = Object.assign({ offset }, params);
  //   }
  //   if (limit) {
  //     params = Object.assign({ limit }, params);
  //   }
  //   if (orderBy) {
  //     params = Object.assign({ orderBy }, params);
  //   }
  //   if (orderDirection) {
  //     params = Object.assign({ orderDirection }, params);
  //   }
  //   try {
  //     const results = await AreasModel.getAll(params);
  //     res.json(results);
  //   } catch (e) {
  //     console.error("error al obtener las areas", e);
  //     res.status(500).send("error en el servidor");
  //   }
  // }
  // public async create(req: Request, res: Response) {
  //   const { title } = req.body;
  //   const orden = parseInt(req.body.orden as string);
  //   try {
  //     await AreasModel.create({ title, orden });
  //     res.status(201).send("Registro creado satisfactoriamente!");
  //   } catch (e: any) {
  //     // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
  //     if (e.name === "ValidationError") {
  //       res.status(400).json({ error: e.errors });
  //     } else {
  //       res.status(500).json({ error: "Internal Server Error" });
  //     }
  //     console.error(e);
  //   }
  // }
  // public async setActive(req: Request, res: Response) {
  //   const id = parseInt(req.params.id as string);
  //   const estado = req.body.estado;
  //   try {
  //     const result = await AreasModel.setActive({ id, estado });
  //     res.status(200).send("Area publicada satisfactoriamente!");
  //   } catch (e: any) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //     console.error(e);
  //   }
  // }

  // public async update(req: Request, res: Response) {
  //   const id = parseInt(req.params.id as string);
  //   const title = req.body.title;
  //   const orden = parseInt(req.body.orden as string);
  //   try {
  //     const result = await AreasModel.update({ id, title, orden });
  //     res.status(200).send("Area modificada satisfactoriamente!");
  //   } catch (e: any) {
  //     // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
  //     if (e.name === "ValidationError") {
  //       res.status(400).json({ error: e.errors });
  //     } else {
  //       res.status(500).json({ error: "Internal Server Error" });
  //     }
  //     console.error(e);
  //   }
  // }

  // public async delete(req: Request, res: Response) {
  //   const id = parseInt(req.params.id as string);
  //   try {
  //     const result = await AreasModel.delete({ id });
  //     res.status(200).send("Area eliminada satisfactoriamente!");
  //   } catch (e: any) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //     console.error(e);
  //   }
  // }

  // public async getAreasNames(req: Request, res: Response) {
  //   try {
  //     const result = await AreasModel.getAreasNames();
  //     res.json(result);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
