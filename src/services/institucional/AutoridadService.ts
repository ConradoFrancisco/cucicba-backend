import { DataSource, FindManyOptions, Like, Repository } from "typeorm";

import { getDataSource } from "../../data-source";

import { ParamsDto } from "../../dtos/ParamsDto";
import { Area } from "../../entity/Area";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { AutoridadPrincipal } from "../../entity/institucional/AutoridadPrincipal";
import { AutoridadDto } from "../../dtos/institucional/AutoridadDto";


export default class AutoridadService {
  private repository: Repository<AutoridadPrincipal>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(AutoridadPrincipal);
  }

  public async getAll(
    p: ParamsDto
  ): Promise<{ data: AutoridadDto[]; total: number }> {
    const where: FindManyOptions<AutoridadPrincipal>["where"] = { deletedAt: null };
    if (p.input) {
      where.nombre = Like(`%${p.input}%`);
    }
    
    if (p.estado !== null) {
      where.estado = p.estado;
    }
    if (p.orden !== null) {
      where.orden = p.orden;
    }
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
    return { data: autoridadesDto, total };
  }

  public async createAutoridad(p: AutoridadDto): Promise<AutoridadPrincipal> {
    const nuevaAutoridad = new AutoridadPrincipal();
    nuevaAutoridad.nombre = p.nombre;
    nuevaAutoridad.apellido = p.apellido;
    nuevaAutoridad.estado = p.estado || false;
    nuevaAutoridad.orden = p.orden || null;
    nuevaAutoridad.createdAt = new Date();
    nuevaAutoridad.updatedAt = new Date();
    nuevaAutoridad.foto = p.foto ;
    nuevaAutoridad.cargo = p.cargo;

    const autoridadGuardada = await this.repository.save(nuevaAutoridad);
    return autoridadGuardada;
  }

  public async updateAutoridad(p: AutoridadDto): Promise<AutoridadPrincipal | null> {
    const autoridadExistente = await this.repository.findOne({
      where: { id: p.id },
    });
    if (!autoridadExistente) {
      return null;
    }

    autoridadExistente.nombre = p.nombre;
    autoridadExistente.apellido = p.apellido;
    autoridadExistente.estado = p.estado || false;
    autoridadExistente.orden = p.orden || null;
    autoridadExistente.updatedAt = new Date();
    autoridadExistente.foto = p.foto ;
    autoridadExistente.cargo = p.cargo;
   

    const autoridadActualizada = await this.repository.save(autoridadExistente);
    return autoridadActualizada;
  }

  public async setActive(p: ActiveParamsDto): Promise<AutoridadPrincipal | null> {
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

  public async delete(p: DeleteParamsDto): Promise<AutoridadPrincipal  | null> {
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