import { DataSource } from 'typeorm';
import AreaTableSeeder from './AreaTableSeeder';
import TipoPersonaTableSeeder from './TipoPersonaTableSeeder';

class DbSeed{

    constructor(){
        // code here...
    }

    public async run(cn: DataSource){
        await AreaTableSeeder.run(cn);
        await TipoPersonaTableSeeder.run(cn);
    }

}

export default new DbSeed();