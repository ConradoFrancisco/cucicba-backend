import { DataSource, FindManyOptions, ILike, Like, Repository } from "typeorm";
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
      where.nombre = ILike(`%${p.input}%`);
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

  public async createInfractor(infractor: InfractorDto): Promise<void> {
    await this.repository.save(infractor);
  }

  public async updateInfractor(infractor: InfractorDto): Promise<void> {
    const infractorExistente = await this.repository.findOneBy({
      id: infractor.id,
    });
    if (!infractorExistente) {
      return null;
    }
    infractorExistente.nombre = infractor.nombre;
    infractorExistente.direccion = infractor.direccion;
    infractorExistente.fecha = infractor.fecha;
    infractorExistente.updatedAt = new Date();

    await this.repository.save(infractorExistente);
  }

  public async setEstado(p: ActiveParamsDto): Promise<void> {
    const infractorExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!infractorExistente) {
      return null;
    }
    infractorExistente.estado = p.estado;
    infractorExistente.updatedAt = p.updatedAt;

    await this.repository.save(infractorExistente);
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

    return await this.repository.save(infractorExistente);
  }
}
