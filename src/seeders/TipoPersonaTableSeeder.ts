import { DataSource } from 'typeorm';
import { TipoPersona } from '../entity/TipoPersona';

class TipoPersonaTableSeeder {

    constructor() {
        // code here ...
    }

    public async run(cn: DataSource = null) {
        if(cn.driver.options.type === 'sqlite')
            await cn.manager.query('DELETE FROM tipo_persona;');
        else
            await cn.manager.query('TRUNCATE TABLE public.tipo_persona RESTART IDENTITY CASCADE;');

        const tp1 = new TipoPersona();
        tp1.descripcion = 'Autoridad';

        const tp2 = new TipoPersona();
        tp2.descripcion = 'Personal';

        await cn.manager.save([tp1, tp2]);
    }
}

export default new TipoPersonaTableSeeder();