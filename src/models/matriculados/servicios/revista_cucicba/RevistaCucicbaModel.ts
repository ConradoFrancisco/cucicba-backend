import { Op } from 'sequelize';
import RevistaCucicba from './RevistaCucicba';

class RevistaCucicbaModel {
  public async getAll({
    limit,
    offset = 0,
    input = "",
    estado,
    orderBy = "id",
    orderDirection = "ASC",
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    estado?: number;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    const where: any = {};
    if (input) {
      where[Op.or] = [
        { portada: { [Op.like]: `%${input}%` } },
        { archivo: { [Op.like]: `%${input}%` } }
      ];
    }
    if (estado !== undefined) where.estado = estado;

    try {
      const { rows: data, count: total } = await RevistaCucicba.findAndCountAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
      });

      return { data, total };
    } catch (e) {
      console.error(e);
      throw new Error("Error al obtener las revistas");
    }
  }

  // Crear una nueva revista
  public async create({
    portada,
    archivo,
  }: {
    portada: string;
    archivo: string;
  }) {
    try {
      const result = await RevistaCucicba.create({
        portada,
        archivo,
      });
      return result;
    } catch (e) {
      console.error(e);
      throw new Error("Error al crear la revista");
    }
  }

  // Actualizar el estado de una revista
  public async setActive({ id, estado }: { id: number; estado: number }) {
    try {
      await RevistaCucicba.update({ estado }, {
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new Error("Error al actualizar el estado de la revista");
    }
  }

  // Eliminar una revista
  public async delete({ id }: { id: number }) {
    try {
      await RevistaCucicba.destroy({
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new Error("Error al eliminar la revista");
    }
  }

  // Actualizar una revista
  public async update({
    id,
    portada,
    archivo,
  }: {
    id: number;
    portada?: string;
    archivo?: string;
  }) {
    const updateData: any = {};
    if (portada !== undefined) updateData.portada = portada;
    if (archivo !== undefined) updateData.archivo = archivo;

    try {
      await RevistaCucicba.update(updateData, {
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new Error("Error al actualizar la revista");
    }
  }
}

export default new RevistaCucicbaModel();