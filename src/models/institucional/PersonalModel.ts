import { db } from "../../db/Database"

class PersonalModel{
    public async getAll({limit = undefined}){
        let limitTxt = '';
        let queryParams = []
        if (limit){
            limitTxt = 'LIMIT ?'
            queryParams.push(limit)
        }
        const conn = await db.getConnection();
        const query = `SELECT p.id, p.name, p.lastname, p.phone, p.email, p.position, a.title AS area FROM personal p JOIN areas a ON p.area = a.id ${limitTxt}`
        try{
            const [data] = await conn.query(query)
            return (data)
        }catch(e){
            throw new Error("Hubo un error con la db"),e
        }
        
    }
}

export default new PersonalModel()