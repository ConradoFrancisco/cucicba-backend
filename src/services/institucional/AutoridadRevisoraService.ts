import { DataSource, FindManyOptions, Like, Repository } from "typeorm";

import { getDataSource } from "../../data-source";

import { ParamsDto } from "../../dtos/ParamsDto";
import { Area } from "../../entity/Area";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";

import { AutoridadDto } from "../../dtos/institucional/AutoridadDto";
import { Cargo } from "../../entity/Cargo";
import { AutoridadEtica } from "../../entity/AutoridadEtica";
import { EticaDto } from "../../dtos/institucional/EticaDto";
import { AutoridadRevisora } from "../../entity/AutoridadRevisadora";

export default class AutoridadRevisoraService {
  private repository: Repository<AutoridadRevisora>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(AutoridadRevisora);
  }

  public async getAll(
    p: ParamsDto
  ): Promise<{ data: EticaDto[]; total: number }> {
    const where: FindManyOptions<AutoridadRevisora>["where"] = {
      deletedAt: null,
    };
    if (p.input) {
      where.nombre = Like(`%${p.input}%`);
    }

    if (p.estado !== null) {
      where.estado = p.estado;
    }
    const order: FindManyOptions<AutoridadRevisora>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
    };

    const [autoridades, total] = await this.repository.findAndCount(options);
    const autoridadesDto = autoridades.map(
      (autoridad) => new EticaDto(autoridad)
    );
    return { data: autoridadesDto, total };
  }

  public async createAutoridad(p: EticaDto): Promise<AutoridadRevisora | null> {
    const nuevaAutoridad = new AutoridadRevisora();
    nuevaAutoridad.nombre = p.nombre;
    nuevaAutoridad.orden = p.orden;
    nuevaAutoridad.apellido = p.apellido;
    nuevaAutoridad.estado = p.estado || false;
    nuevaAutoridad.titular = p.titular;
    nuevaAutoridad.createdAt = new Date();
    nuevaAutoridad.updatedAt = new Date();

    const autoridadGuardada = await this.repository.save(nuevaAutoridad);
    return autoridadGuardada;
  }

  public async updateAutoridad(p: EticaDto): Promise<AutoridadRevisora | null> {
    const autoridadExistente = await this.repository.findOne({
      where: { id: p.id },
    });
    if (!autoridadExistente) {
      return null;
    }

    autoridadExistente.nombre = p.nombre;
    autoridadExistente.orden = p.orden;
    autoridadExistente.apellido = p.apellido;
    autoridadExistente.estado = p.estado || false;
    autoridadExistente.titular = p.titular;
    autoridadExistente.createdAt = new Date();
    autoridadExistente.updatedAt = new Date();

    const autoridadActualizada = await this.repository.save(autoridadExistente);
    return autoridadActualizada;
  }

  public async setActive(
    p: ActiveParamsDto
  ): Promise<AutoridadRevisora | null> {
    const autoridadExistente = await this.repository.findOne({
      where: { id: p.id },
    });
    if (!autoridadExistente) {
      return null;
    }
    autoridadExistente.estado = p.estado;
    autoridadExistente.updatedAt = p.updatedAt;

    const autoridadActualizada = await this.repository.save(autoridadExistente);
    return autoridadActualizada;
  }

  public async delete(p: DeleteParamsDto): Promise<AutoridadRevisora | null> {
    const autoridadExistente = await this.repository.findOne({
      where: { id: p.id },
    });
    if (!autoridadExistente) {
      return null;
    }
    autoridadExistente.deletedAt = p.deletedAt;
    autoridadExistente.updatedAt = p.deletedAt;

    const autoridadActualizada = await this.repository.save(autoridadExistente);
    return autoridadActualizada;
  }
}
