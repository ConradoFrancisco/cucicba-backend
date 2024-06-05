import { Op } from "sequelize";
import CategoriaSancion from "../servicios/sanciones_tribunal/CategoriaSanciones";
import SancionesTribunal from "../servicios/sanciones_tribunal/SancionesTribunal";

class SancionesModel {
  public async getAll({
    limit,
    offset = 0,
    input = "",
    estado,
    fecha,
    categoria,
    orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    fecha?: string;
    estado?: string;
    categoria?: number;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    const where: any = {};
    if (input) {
      where.descripcion = { [Op.like]: `%${input}%` };
    }
    if (estado !== undefined) where.estado = estado;
    if (categoria !== undefined) where.categoria_sancion_id = categoria;

    try {
      const { rows: data, count: total } =
        await SancionesTribunal.findAndCountAll({
          where,
          limit,
          offset,
          order: [[orderBy, orderDirection]],
          include: [
            {
              model: CategoriaSancion,
              attributes: ["nombre"],
            },
          ],
          attributes: [
            "id",
            "categoria_sancion_id",
            "fecha",
            "descripcion",
            "estado",
            "pdf",
          ],
        });
      const modifiedRows = data.map((row: any) => ({
        ...row.toJSON(),
        categoria: row.CategoriaSancion?.nombre || null,
      }));
      
      return { data:modifiedRows, total };
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async create({
    categoria,
    descripcion,
    fecha,
    pdf = "",
  }: {
    categoria: number;
    descripcion: string;
    fecha: string;
    pdf: string;
  }) {
    try {
      const result = await SancionesTribunal.create({
        categoria_sancion_id: categoria,
        descripcion,
        fecha,
        pdf,
      });
      return result;
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    try {
      await SancionesTribunal.update(
        { estado },
        {
          where: { id },
        }
      );
    } catch (e) {
      throw new Error("Error al publicar la sanción");
    }
  }

  public async delete({ id }: { id: number }) {
    try {
      await SancionesTribunal.destroy({
        where: { id },
      });
    } catch (e) {
      throw new Error("Error al eliminar la sanción");
    }
  }

  public async update({
    id,
    categoria_sancion_id,
    descripcion,
    fecha,
    pdf = "",
  }: {
    id: number;
    categoria_sancion_id: number;
    descripcion: string;
    fecha: string;
    pdf: string;
  }) {
    const updateData: any = { categoria_sancion_id, descripcion, fecha, pdf };

    try {
      await SancionesTribunal.update(updateData, {
        where: { id },
      });
    } catch (e) {
      throw new Error("Error al modificar la sancion");
    }
  }

  public async getCategorys() {
    try {
      const data = await CategoriaSancion.findAll();
      return data;
    } catch (e) {
      throw new Error("Error en la db al obtener las categorías");
    }
  }
}

export default new SancionesModel();
