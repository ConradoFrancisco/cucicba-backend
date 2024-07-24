import { DataSource, FindManyOptions, Like, Repository } from "typeorm";

import { getDataSource } from "../../data-source";
import { PersonalDto } from "../../dtos/institucional/PersonalDto";
import { ParamsDto } from "../../dtos/ParamsDto";
import { Area } from "../../entity/Area";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { Personal } from "../../entity/Personal";

export default class PersonalService {
  private repository: Repository<Personal>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(Personal);
  }

  public async getAll(
    p: ParamsDto
  ): Promise<{ data: PersonalDto[]; total: number }> {
    const where: FindManyOptions<Personal>["where"] = { deletedAt: null };
    console.log(p.area);
    if (p.input) {
      where.nombre = Like(`%${p.input}%`);
    }
    if (p.area) {
      where.area = p.area;
    }
    if (p.estado !== null) {
      where.estado = p.estado;
    }
    if (p.orden !== null) {
      where.orden = p.orden;
    }
    const order: FindManyOptions<Personal>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
      relations: ["area"],
    };

    const [personales, total] = await this.repository.findAndCount(options);
    const personalesDto = personales.map(
      (personal) => new PersonalDto(personal, true)
    );
    return { data: personalesDto, total };
  }

  public async createPersonal(p: PersonalDto): Promise<Personal> {
    const nuevaPersonal = new Personal();
    nuevaPersonal.nombre = p.nombre;
    nuevaPersonal.apellido = p.apellido;
    nuevaPersonal.telefono = p.telefono || null;
    nuevaPersonal.email = p.email || null;
    nuevaPersonal.posicion = p.posicion || null;
    nuevaPersonal.estado = p.estado || false;
    nuevaPersonal.orden = p.orden || null;
    nuevaPersonal.createdAt = new Date();
    nuevaPersonal.updatedAt = new Date();
    nuevaPersonal.area = p.area;

    const personalGuardada = await this.repository.save(nuevaPersonal);
    return personalGuardada;
  }

  public async updatePersonal(p: PersonalDto): Promise<Personal | null> {
    const personalExistente = await this.repository.findOne({
      where: { id: p.id },
    });
    if (!personalExistente) {
      return null;
    }

    personalExistente.nombre = p.nombre;
    personalExistente.apellido = p.apellido;
    personalExistente.telefono = p.telefono || null;
    personalExistente.email = p.email || null;
    personalExistente.posicion = p.posicion || null;
    personalExistente.estado = p.estado || false;
    personalExistente.orden = p.orden || null;
    personalExistente.updatedAt = new Date();

    if (p.areaId) {
      const ds: DataSource = getDataSource();
      const areaRepo: Repository<Area> = ds.manager.getRepository(Area);
      const area = await areaRepo.findOne({ where: { id: p.areaId } });
      if (area) {
        personalExistente.area = area;
      }
    }

    const personalActualizada = await this.repository.save(personalExistente);
    return personalActualizada;
  }

  public async setActive(p: ActiveParamsDto): Promise<Personal | null> {
    const personalExistente = await this.repository.findOne({
      where: { id: p.id },
    });
    if (!personalExistente) {
      return null;
    }
    personalExistente.estado = p.estado;
    personalExistente.updatedAt = p.updatedAt;

    const personalActualizada = await this.repository.save(personalExistente);
    return personalActualizada;
  }

  public async delete(p: DeleteParamsDto): Promise<Personal | null> {
    const personalExistente = await this.repository.findOne({
      where: { id: p.id },
    });
    if (!personalExistente) {
      return null;
    }
    personalExistente.deletedAt = p.deletedAt;
    personalExistente.updatedAt = p.deletedAt;

    const personalActualizada = await this.repository.save(personalExistente);
    return personalActualizada;
  }
  public async getPersonalByArea(): Promise<any[]> {
    const personales = await this.repository.find({ relations: ["area"] });
    const activePersonales = personales.filter((personal) => personal.estado);

    const grouped = activePersonales.reduce((acc, personal) => {
      const areaTitle = personal.area ? personal.area.nombre : "Sin área";
      if (!acc[areaTitle]) {
        acc[areaTitle] = {
          title: areaTitle,
          workers: [],
        };
      }
      acc[areaTitle].workers.push({
        id: personal.id,
        name: personal.nombre,
        lastname: personal.apellido,
        phone: personal.telefono,
        email: personal.email,
        position: personal.posicion,
      });
      return acc;
    }, {});

    const filteredGrouped = Object.values(grouped).filter(
      (group: any) => group.workers.length > 0
    );

    return filteredGrouped;
  }
}
