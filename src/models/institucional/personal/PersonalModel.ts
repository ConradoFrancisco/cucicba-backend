import { Op } from "sequelize";
import Area from "./area"; // Ajusta la ruta a tus modelos
import Personal from "./personal";

class PersonalModel {
  public async getAll({
    limit,
    offset = 0,
    input,
    estado,
    area,
    orderBy = "id",
    orderDirection = "ASC",
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    estado?: string;
    area?: number;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    const where: any = {};
    if (input) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${input}%` } },
        { apellido: { [Op.like]: `%${input}%` } },
        { telefono: { [Op.like]: `%${input}%` } },
        { cargo: { [Op.like]: `%${input}%` } },
      ];
    }
    if (estado !== undefined) {
      where.estado = estado;
    }
    if (area !== undefined) {
      where.area = area;
    }

    const { count, rows } = await Personal.findAndCountAll({
      where,
      include: [
        {
          model: Area,
          attributes: ["id","title"],
        },
      ],
      order: [[orderBy, orderDirection]],
      limit,
      offset,
    });

    const modifiedRows = rows.map((row: any) => ({
      ...row.toJSON(),
      area: row.Area?.title || null,
      area_id: row.Area?.id || null
    }));

    return { data: modifiedRows, total: count };
  }

  public async create({
    nombre,
    apellido,
    telefono,
    email,
    cargo,
    area,
  }: {
    nombre: string;
    apellido: string;
    telefono?: string;
    email?: string;
    cargo: string;
    area: number;
  }) {
    return await Personal.create({
      nombre,
      apellido,
      telefono,
      email,
      cargo,
      area,
    });
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    return await Personal.update({ estado }, { where: { id } });
  }

  public async delete({ id }: { id: number }) {
    return await Personal.destroy({ where: { id } });
  }

  public async update({
    id,
    nombre,
    apellido,
    telefono,
    email,
    cargo,
    area,
  }: {
    id: number;
    nombre: string;
    apellido: string;
    telefono?: string;
    email?: string;
    cargo: string;
    area: number;
  }) {
    const fieldsToUpdate: any = { nombre, apellido, cargo, area };
    if (telefono !== undefined) fieldsToUpdate.telefono = telefono;
    if (email !== undefined) fieldsToUpdate.email = email;
    return await Personal.update(fieldsToUpdate, { where: { id } });
  }

  public async getAllByAreas() {
    const data = await Area.findAll({
      where: { estado: { [Op.ne]: 0 } },
      include: [
        {
          model: Personal,
          where: { estado: { [Op.ne]: 0 } },
          required: false,
          attributes: [
            "id",
            "nombre",
            "apellido",
            "telefono",
            "email",
            "cargo",
          ],
        },
      ],
      order: [
        ["orden", "ASC"],
        [Personal, "id", "ASC"],
      ],
    });
    return { data };
  }
}

export default new PersonalModel();
