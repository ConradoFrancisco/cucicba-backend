import { DataSource, FindManyOptions, Like, Repository } from "typeorm";
import { getDataSource } from "../../data-source";
import { Infractor } from "../../entity/servicios/Infractor";
import { ParamsDto } from "../../dtos/ParamsDto";
import { InfractorDto } from "../../dtos/servicios/InfractorDto";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";

export default class InfractorService {
  private repository: Repository<Infractor>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(Infractor);
  }

  public async getAll(
    p: ParamsDto
  ): Promise<{ data: InfractorDto[]; total: number }> {
    const where: FindManyOptions<Infractor>["where"] = {};
    where.deletedAt != null;
    if (p.input) {
      where.nombre = Like(`%${p.input}%`);
    }

    if (p.estado !== null) {
      where.estado = p.estado;
    }

    const order: FindManyOptions<Infractor>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
    };

    const [infractores, total] = await this.repository.findAndCount(options);
    const infractoresDto: InfractorDto[] = infractores.map(
      (infractor) => new InfractorDto(infractor)
    );
    return { data: infractoresDto, total };
  }
  public async createInfractor(p: InfractorDto): Promise<Infractor> {
    const nuevoInfractor = new Infractor();
    nuevoInfractor.nombre = p.nombre;
    nuevoInfractor.fecha = p.fecha;
    nuevoInfractor.direccion = p.direccion;

    const infractorGuardado = await this.repository.save(nuevoInfractor);
    return infractorGuardado;
  }
  public async updateInfractor(p: InfractorDto): Promise<Infractor | null> {
    const infractorExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!infractorExistente) {
      return null;
    }
    infractorExistente.nombre = p.nombre;
    infractorExistente.direccion = p.direccion;
    infractorExistente.fecha = p.fecha;
    infractorExistente.updatedAt = new Date();

    const infractorActualizado = await this.repository.save(infractorExistente);
    return infractorActualizado;
  }
  public async setActive(p: ActiveParamsDto): Promise<Infractor | null> {
    const infractorExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!infractorExistente) {
      return null;
    }
    infractorExistente.estado = p.estado;
    infractorExistente.updatedAt = p.updatedAt;

    const areaActualizada = await this.repository.save(infractorExistente);
    return areaActualizada;
  }
  public async delete(p: DeleteParamsDto): Promise<Infractor | null> {
    const infractorExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!infractorExistente) {
      return null;
    }
    infractorExistente.deletedAt = p.deletedAt;
    infractorExistente.updatedAt = p.deletedAt;
    const infractorEliminado = await this.repository.save(infractorExistente);
    return infractorEliminado;
  }
}
