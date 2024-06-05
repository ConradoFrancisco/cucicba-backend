import { Op } from 'sequelize';
import PreguntasFrecuentes from './PreguntasFrecuentes';
import PreguntasFrecuentesCategoria from './PreguntasFrecuentesCategoria';


class PreguntasFrecuentesModel {
  public async getPreguntas({
    limit,
    offset = 0,
    estado,
    category,
    input,
    orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
  }: {
    estado?: number;
    limit?: number;
    offset?: number;
    category?: number;
    input?: string;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    const where: any = {};
    if (input) {
      where.pregunta = { [Op.like]: `%${input}%` };
    }
    if (estado !== undefined) where.estado = estado;
    if (category !== undefined) where.categoria_id = category;

    try {
      const { rows: data, count: total } = await PreguntasFrecuentes.findAndCountAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
        include: [{
          model: PreguntasFrecuentesCategoria,
          attributes: ['titulo'],
        }],
        attributes: [
          'id',
          'pregunta',
          'estado',
          'respuesta',
          'categoria_id',
        ],
      });
      const modifiedRows = data.map((row: any) => ({
        ...row.toJSON(),
        categoria: row.PreguntasFrecuentesCategoria?.titulo || null,
        
      }));
      console.log(modifiedRows)
      return { data:modifiedRows, total };
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async getCategorys() {
    try {
      const data = await PreguntasFrecuentesCategoria.findAll();
      return data;
    } catch (e) {
      console.error("Error al obtener las categorías: ", e);
      throw new Error("Error al obtener las categorías");
    }
  }

  public async create({
    pregunta,
    respuesta,
    categoria,
  }: {
    pregunta: string;
    respuesta: string;
    categoria: number;
  }) {
    try {
      const result = await PreguntasFrecuentes.create({
        pregunta,
        respuesta,
        categoria_id: categoria,
      });
      return result;
    } catch (e) {
      console.error("Error en la db al ingresar la pregunta frecuente: ", e);
      throw new Error("Error en la db al ingresar la pregunta frecuente");
    }
  }

  public async update({
    id,
    pregunta,
    respuesta,
    categoria,
  }: {
    id: number;
    pregunta: string;
    respuesta: string;
    categoria: number;
  }) {
    try {
      await PreguntasFrecuentes.update({
        pregunta,
        respuesta,
        categoria_id: categoria,
      }, {
        where: { id },
      });
    } catch (e) {
      console.error("Error en la db al actualizar la pregunta frecuente: ", e);
      throw new Error("Error en la db al actualizar la pregunta frecuente");
    }
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    try {
      await PreguntasFrecuentes.update({ estado }, {
        where: { id },
      });
    } catch (e) {
      console.error("Error al activar la pregunta frecuente: ", e);
      throw new Error("Error al activar la pregunta frecuente");
    }
  }

  public async delete({ id }: { id: number }) {
    try {
      await PreguntasFrecuentes.destroy({
        where: { id },
      });
    } catch (e) {
      console.error("Error al eliminar la pregunta frecuente: ", e);
      throw new Error("Error al eliminar la pregunta frecuente");
    }
  }
}

export default new PreguntasFrecuentesModel();