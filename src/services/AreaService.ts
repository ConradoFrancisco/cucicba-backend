import { DataSource, Repository } from 'typeorm';
import { getDataSource } from '../data-source';
import { Area } from '../entity/Area';

export default class AreaService {

    private repository: Repository<Area>;

    constructor(){
        const ds: DataSource = getDataSource();
        this.repository = ds.manager.getRepository(Area);
    }

    public async getAll(): Promise<Area[]>{
        return await this.repository.find();
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