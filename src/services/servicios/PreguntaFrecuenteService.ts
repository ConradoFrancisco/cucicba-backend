import { DataSource, FindManyOptions, Like, Repository } from "typeorm";
import { getDataSource } from "../../data-source";
import { ParamsDto } from "../../dtos/ParamsDto";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { PreguntaFrecuente } from "../../entity/servicios/PreguntaFrecuente";
import { PreguntaFrecuenteDto } from "../../dtos/servicios/PreguntaFrecuenteDto";
import { CategoriasPreguntasFrecuentes } from "../../entity/servicios/Categoria_pregunta_frecuente";

export class PreguntaFrecuenteService {
  private repository: Repository<PreguntaFrecuente>;
  private categoriaRepository: Repository<CategoriasPreguntasFrecuentes>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(PreguntaFrecuente);
    this.categoriaRepository = ds.manager.getRepository(CategoriasPreguntasFrecuentes);
  }
  public async getAll(p: ParamsDto) {
    const where: FindManyOptions<PreguntaFrecuente>["where"] = {};
    where.deletedAt != null;
    if (p.input) {
      where.pregunta = Like(`%${p.input}%`);
    }

    if (p.estado !== null) {
      where.estado = p.estado;
    }

    where.categoria = {id:p.categoriaId}

    const order: FindManyOptions<PreguntaFrecuente>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
      relations: ["categoria"], 
    };

    const [data, total] = await this.repository.findAndCount(options);

    const preguntasFrecuentesDto = data.map(
      (pregunta) => new PreguntaFrecuenteDto(pregunta)
    );

    return { data: preguntasFrecuentesDto, total };
  }
  public async getAllCategorias() {
    const categorias = await this.categoriaRepository.find();
    return categorias;
  }
  /* public async createInmobiliariaIlegal(
    p: InmobiliariaIlegalDto
  ): Promise<Ilegal> {
    const nuevaInmobiliariaIlegal = new Ilegal();
    nuevaInmobiliariaIlegal.nombre = p.nombre;
    nuevaInmobiliariaIlegal.fecha = p.fecha;
    nuevaInmobiliariaIlegal.direccion = p.direccion;

    const infractorGuardado = await this.repository.save(
      nuevaInmobiliariaIlegal
    );
    return infractorGuardado;
  }
  public async updateInmobiliariaIlegal(
    p: InmobiliariaIlegalDto
  ): Promise<Ilegal | null> {
    const inmobiliairaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!inmobiliairaExistente) {
      return null;
    }
    inmobiliairaExistente.nombre = p.nombre;
    inmobiliairaExistente.direccion = p.direccion;
    inmobiliairaExistente.fecha = p.fecha;
    inmobiliairaExistente.updatedAt = new Date();

    const inmobiliariaActualizada = await this.repository.save(
      inmobiliairaExistente
    );
    return inmobiliariaActualizada;
  }
  public async setActive(p: ActiveParamsDto): Promise<Ilegal | null> {
    const inmobiliariaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!inmobiliariaExistente) {
      return null;
    }
    inmobiliariaExistente.estado = p.estado;
    inmobiliariaExistente.updatedAt = p.updatedAt;

    const areaActualizada = await this.repository.save(inmobiliariaExistente);
    return areaActualizada;
  }
  public async delete(p: DeleteParamsDto): Promise<Ilegal | null> {
    const inmobiliariaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!inmobiliariaExistente) {
      return null;
    }
    inmobiliariaExistente.deletedAt = p.deletedAt;
    inmobiliariaExistente.updatedAt = p.deletedAt;
    const inmobiliariaEliminada = await this.repository.save(
      inmobiliariaExistente
    );
    return inmobiliariaEliminada;
  } */

  /* public async getAllNoCausa({
    limit,
    offset = 0,
    input = "",
    estado,
    fecha,
    orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    fecha?: string;
    estado?: string;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    const where: any = { causa: 0 };
    if (input) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${input}%` } },
        { direccion: { [Op.like]: `%${input}%` } },
      ];
    }
    if (estado !== undefined) where.estado = estado;

    try {
      const { rows: data, count: total } =
        await InmobiliariasIlegales.findAndCountAll({
          where,
          limit,
          offset,
          order: [[orderBy, orderDirection]],
          attributes: [
            "id",
            "nombre",
            "direccion",
            [
              sequelize.fn("DATE_FORMAT", sequelize.col("fecha"), "%d-%m-%Y"),
              "fecha",
            ],
            [
              sequelize.fn("DATE_FORMAT", sequelize.col("fecha"), "%Y-%m-%d"),
              "fecha_edit",
            ],
            "estado",
          ],
        });

      return { data, total };
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async create({
    nombre,
    direccion,
    fecha,
    causa = 1,
  }: {
    nombre: string;
    direccion: string;
    fecha: string;
    causa?: number;
  }) {
    try {
      const result = await InmobiliariasIlegales.create({
        nombre,
        direccion,
        fecha,
        causa,
      });
      return result;
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    try {
      await InmobiliariasIlegales.update(
        { estado },
        {
          where: { id },
        }
      );
    } catch (e) {
      throw new Error("Error al publicar la inmobiliaria ilegal");
    }
  }

  public async delete({ id }: { id: number }) {
    try {
      await InmobiliariasIlegales.destroy({
        where: { id },
      });
    } catch (e) {
      throw new Error("Error al eliminar la inmobiliaria ilegal");
    }
  }

  public async update({
    id,
    nombre,
    direccion,
    fecha,
    causa,
  }: {
    id: number;
    nombre?: string;
    direccion?: string;
    fecha?: string;
    causa?: number;
  }) {
    console.log(causa);
    const updateData: any = {};
    if (nombre !== undefined) updateData.nombre = nombre;
    if (direccion !== undefined) updateData.direccion = direccion;
    if (fecha !== undefined) updateData.fecha = fecha;
    if (causa !== undefined || causa === 0) updateData.causa = causa;

    try {
      await InmobiliariasIlegales.update(updateData, {
        where: { id },
      });
    } catch (e) {
      throw new Error("Error al modificar el área");
    }
  }
} */
}
