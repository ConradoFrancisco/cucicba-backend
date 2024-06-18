import { DataSource, Repository } from 'typeorm';
import { getDataSource } from '../data-source';
import { Area } from '../entity/Area';

export default class AreaService {

    private repository: Repository<Area>;

    constructor() {
        const ds: DataSource = getDataSource();
        this.repository = ds.manager.getRepository(Area);
    }

    public async getAll(): Promise<Area[]> {
        return await this.repository.find();
    }
    public async createArea({
        nombre,
        descripcion,
        estado = false,
        orden
    }: {
        nombre: string;
        descripcion: string;
        estado?: boolean;
        orden?: number;
    }): Promise<Area> {
        const nuevaArea = new Area();
        nuevaArea.nombre = nombre;
        nuevaArea.descripcion = descripcion;
        nuevaArea.estado = estado;
        nuevaArea.orden = orden;
        nuevaArea.createdAt = new Date();
        nuevaArea.updatedAt = new Date();

        const areaGuardada = await this.repository.save(nuevaArea);
        return areaGuardada;
    }

    public async updateArea(
        { id, nombre, descripcion, orden }: { id: any, nombre: string; descripcion: string; orden?: number }
    ): Promise<Area | null> {
        const areaExistente = await this.repository.findOne(id);
        if (!areaExistente) {
            return null;
        }

        areaExistente.nombre = nombre;
        areaExistente.descripcion = descripcion;
        areaExistente.orden = orden;
        areaExistente.updatedAt = new Date();

        const areaActualizada = await this.repository.save(areaExistente);
        return areaActualizada;
    }
    public async setActive({id, estado }: {id: any, estado: boolean }): Promise<Area | null> {
    const areaExistente = await this.repository.findOne(id);
    if (!areaExistente) {
        return null;
    }
    areaExistente.estado = estado;
    areaExistente.updatedAt = new Date();

    const areaActualizada = await this.repository.save(areaExistente);
    return areaActualizada;
}
    public async delete({id}:{id: any}): Promise<Area | null> {
        const areaExistente = await this.repository.findOne(id);
        if (!areaExistente) {
            return null;
        }
        areaExistente.deletedAt = new Date();
        areaExistente.updatedAt = new Date();
        const areaActualizada = await this.repository.save(areaExistente);
        return areaActualizada;
    }
    
    // public async get(id): Promise<User>{
    //     return await this.repository.findOne({ where: {id: id}, relations: ['theaters', 'bookings']});
    // }

    // public async store(data): Promise<User>{
    //     const hashedPassword = await this.hashPassword(data.password);
    //     data.password = hashedPassword;
    //     return await this.repository.save(data);
    // }

    // public async update(id, data): Promise<User>{
    //     const user: User = await this.get(id);
    //     user.firstName = data.firstName ? data.firstName : user.firstName;
    //     user.lastName = data.lastName ? data.lastName : user.lastName;
    //     user.photo = data.photo ? data.photo : user.photo;
    //     user.age = data.age ? data.age : user.age;

    //     return await this.repository.save(user);
    // }

    // public async delete(id): Promise<any>{
    //     return await this.repository.delete(id);
    // }
}