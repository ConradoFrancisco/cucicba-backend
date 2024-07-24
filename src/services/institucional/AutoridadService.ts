import {
  DataSource,
  FindManyOptions,
  ILike,
  Like,
  Or,
  Repository,
} from "typeorm";

import { getDataSource } from "../../data-source";

import { ParamsDto } from "../../dtos/ParamsDto";
import { Area } from "../../entity/Area";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { AutoridadPrincipal } from "../../entity/institucional/AutoridadPrincipal";
import { AutoridadDto } from "../../dtos/institucional/AutoridadDto";
import { Cargo } from "../../entity/institucional/Cargo";
import { Periodo } from "../../entity/institucional/AutoridadPeriodo";

export default class AutoridadService {
  private repository: Repository<AutoridadPrincipal>;
  private cargosRepository: Repository<Cargo>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(AutoridadPrincipal);
    this.cargosRepository = ds.manager.getRepository(Cargo);
  }

  public async getAll(
    p: ParamsDto
  ): Promise<{ data: AutoridadDto[]; total: number }> {
    console.log("aca", p.periodo);
    const query = this.repository
      .createQueryBuilder("autoridad_principal")
      .leftJoinAndSelect("autoridad_principal.cargo", "cargo")
      .leftJoinAndSelect("autoridad_principal.periodo", "periodo");

    if (p.puesto) {
      query.andWhere("autoridad_principal.cargoId = :puesto", {
        puesto: p.puesto,
      });
    }
    if (p.periodo) {
      query.andWhere("autoridad_principal.periodoId = :periodo", {
        periodo: p.periodo,
      });
    }
    if (p.input) {
      query
        .andWhere("autoridad_principal.nombre ILIKE :nombre", {
          nombre: p.input,
        })
        .orWhere("autoridad_principal.apellido ILIKE :apellido", {
          apellido: p.input,
        });
    }
    if (p.estado !== null && p.estado !== undefined) {
      query.andWhere("autoridad_principal.estado = :estado", {
        estado: p.estado,
      });
    }

    if (p.orden !== null) {
      query.andWhere("autoridad_principal.orden = :orden", { orden: p.orden });
    }

    if (p.orderBy) {
      const orderDirection = p.orderDirection || "ASC";
      query.orderBy(`autoridad_principal.${p.orderBy}`, orderDirection);
    } else {
      query.orderBy("autoridad_principal.id", "ASC");
    }

    if (p.limit) {
      query.limit(p.limit);
    }
    if (p.offset) {
      query.offset(p.offset);
    }

    const [result, total] = await query.getManyAndCount();
    const autoridadesDto = result.map(
      (autoridad) => new AutoridadDto(autoridad, true)
    );
    return { data: autoridadesDto, total };
    /* 
    const order: FindManyOptions<AutoridadPrincipal>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
      relations: ["cargo"],
    };

    const [autoridades, total] = await this.repository.findAndCount(options);
    const autoridadesDto = autoridades.map(
      (autoridad) => new AutoridadDto(autoridad, true)
    );
    return { data: autoridadesDto, total }; */
  }
  public async getCargos() {
    const [cargos] = await this.cargosRepository.findAndCount();
    return cargos;
  }

  public async createAutoridad(
    p: AutoridadDto
  ): Promise<AutoridadPrincipal | null> {
    const cargo = await this.cargosRepository.findOneBy({ id: p.cargoid });
    if (!cargo) {
      return null;
    }
    const nuevaAutoridad = new AutoridadPrincipal();
    nuevaAutoridad.nombre = p.nombre;
    nuevaAutoridad.apellido = p.apellido;
    nuevaAutoridad.estado = p.estado || false;
    nuevaAutoridad.orden = p.orden || null;
    nuevaAutoridad.createdAt = new Date();
    nuevaAutoridad.updatedAt = new Date();
    nuevaAutoridad.foto = p.foto;
    nuevaAutoridad.cargo = cargo;
    nuevaAutoridad.periodo = { id: p.periodoId } as Periodo;

    const autoridadGuardada = await this.repository.save(nuevaAutoridad);
    return autoridadGuardada;
  }

  public async updateAutoridad(
    p: AutoridadDto
  ): Promise<AutoridadPrincipal | null> {
    const autoridadExistente = await this.repository.findOne({
      where: { id: p.id },
    });
    if (!autoridadExistente) {
      return null;
    }
    const cargo = await this.cargosRepository.findOneBy({ id: p.cargoid });
    if (!cargo) {
      return null;
    }
    autoridadExistente.nombre = p.nombre;
    autoridadExistente.apellido = p.apellido;
    autoridadExistente.estado = p.estado || false;
    autoridadExistente.orden = p.orden || null;
    autoridadExistente.updatedAt = new Date();
    autoridadExistente.foto = p.foto;
    autoridadExistente.cargo = cargo;

    const autoridadActualizada = await this.repository.save(autoridadExistente);
    return autoridadActualizada;
  }

  public async setActive(
    p: ActiveParamsDto
  ): Promise<AutoridadPrincipal | null> {
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

  public async delete(p: DeleteParamsDto): Promise<AutoridadPrincipal | null> {
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
