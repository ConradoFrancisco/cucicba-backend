import {
  DataSource,
  FindManyOptions,
  FindOptionsWhere,
  Like,
  Repository,
} from "typeorm";
import { getDataSource } from "../data-source";
import { Area } from "../entity/Area";
import { AreaDto } from "../dtos/AreaDto";
import { ParamsDto } from "../dtos/ParamsDto";
import { DeleteParamsDto } from "../dtos/DeleteParamsDto";
import { ActiveParamsDto } from "../dtos/ActiveParamsDto";

export default class AreaService {
  private repository: Repository<Area>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(Area);
  }

  public async getAll(
    p: ParamsDto
  ): Promise<{ data: AreaDto[]; total: number }> {
    console.log(p);
    const where: FindManyOptions<Area>["where"] = {};
    where.deletedAt != null;
    if (p.input) {
      where.nombre = Like(`%${p.input}%`);
    }
    if (p.estado !== null) {
      where.estado = p.estado;
    }
    if (p.orden !== null) {
      where.orden = p.orden;
    }
    const order: FindManyOptions<Area>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
    };

    const [areas, total] = await this.repository.findAndCount(options);
    const areasDto = areas.map((area) => new AreaDto(area));
    return { data: areasDto, total };
  }
  public async createArea(p: AreaDto): Promise<Area> {
    const nuevaArea = new Area();
    nuevaArea.nombre = p.nombre;
    nuevaArea.descripcion = p.descripcion;
    nuevaArea.estado = p.estado;
    nuevaArea.orden = p.orden;
    nuevaArea.createdAt = new Date();
    nuevaArea.updatedAt = new Date();

    const areaGuardada = await this.repository.save(nuevaArea);
    return areaGuardada;
  }

  public async updateArea(p: AreaDto): Promise<Area | null> {
    const areaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!areaExistente) {
      return null;
    }

    areaExistente.nombre = p.nombre;
    areaExistente.descripcion = p.descripcion;
    areaExistente.orden = p.orden;
    areaExistente.updatedAt = new Date();

    const areaActualizada = await this.repository.save(areaExistente);
    return areaActualizada;
  }
  public async setActive(p: ActiveParamsDto): Promise<Area | null> {
    const areaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!areaExistente) {
      return null;
    }
    areaExistente.estado = p.estado;
    areaExistente.updatedAt = p.updatedAt;

    const areaActualizada = await this.repository.save(areaExistente);
    return areaActualizada;
  }
  public async delete(p: DeleteParamsDto): Promise<Area | null> {
    const areaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!areaExistente) {
      return null;
    }
    areaExistente.deletedAt = p.deletedAt;
    areaExistente.updatedAt = p.deletedAt;
    const areaActualizada = await this.repository.save(areaExistente);
    return areaActualizada;
  }
}
