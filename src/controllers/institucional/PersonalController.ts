import { Request, Response } from "express";
import PersonalModel from "../../models/institucional/personal/PersonalModel";

class PersonalController {
  public async getAll(req: Request, res: Response) {
    let params = {};
    const input = req.query.input;
    const area = parseInt(req.query.area as string);
    const orderDirection =
      (req.query.orderDirection as "ASC" | "DESC") || "ASC";
    const orderBy = (req.query.orderBy as string) || "id";
    const estado = parseInt(req.query.estado as string);
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    console.log(estado);
    if (orderBy) {
      params = Object.assign({ orderBy }, params);
    }
    if (orderDirection) {
      params = Object.assign({ orderDirection }, params);
    }
    if (area) {
      params = Object.assign({ area }, params);
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
      const result = await PersonalModel.getAll(params);
      res.json(result);
    } catch (e) {
      console.error("error al obtener las areas", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async getAllByAreas(req: Request, res: Response) {
    try {
      const response = await PersonalModel.getAllByAreas();
      res.json(response);
    } catch (e) {
      console.error("error al obtener las areas", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async create(req: Request, res: Response) {
    const { nombre, apellido, cargo } = req.body;
    const area = parseInt(req.body.area);
    console.log(req.body);

    let params = { nombre, apellido, cargo, area };
    if (req.body.telefono) {
      const telefono = req.body.telefono.toString();
      params = Object.assign({ telefono }, params);
    }
    if (req.body.email) {
      const email = req.body.email;
      params = Object.assign({ email }, params);
    }
    console.log(params);
    try {
      await PersonalModel.create(params);
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e: any) {
      // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
      if (e.name === "ValidationError") {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
      console.error(e);
    }
  }
  public async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const { nombre, apellido, cargo } = req.body;
    const area = parseInt(req.body.area);
    console.log(req.body);

    let params = { id, nombre, apellido, cargo, area };
    if (req.body.telefono) {
      const telefono = req.body.telefono.toString();
      params = Object.assign({ telefono }, params);
    }
    if (req.body.email) {
      const email = req.body.email;
      params = Object.assign({ email }, params);
    }
    console.log(params);
    try {
      await PersonalModel.update(params);
      res.status(200).send("Registro modificado satisfactoriamente!");
    } catch (e: any) {
      // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
      if (e.name === "ValidationError") {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
      console.error(e);
    }
  }
  public async setActive(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const estado = req.body.estado;
    try {
      const result = await PersonalModel.setActive({ id, estado });
      res.status(200).send("Personal dado de alta satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    try {
      const result = await PersonalModel.delete({ id });
      res.status(200).send("Personal eliminado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
}
export default new PersonalController();
