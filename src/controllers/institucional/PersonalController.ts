import { Request, Response } from "express";
import PersonalModel from "../../models/institucional/PersonalModel";
import { object } from "yup";

class PersonalController{
    public async getAll(req:Request,res:Response){
        let params = {}
        const limit = parseInt(req.query.limit as string)
        if(limit){
            params = Object.assign({limit},params)
        }
        try{
            const result = await PersonalModel.getAll(params);
            res.json(result);
        } catch (e) {
            console.error("error al obtener las areas", e);
            res.status(500).send("error en el servidor");
          }
    }
}
export default new PersonalController();