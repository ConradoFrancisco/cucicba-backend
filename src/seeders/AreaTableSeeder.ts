import { DataSource } from 'typeorm';
import { Area } from '../entity/Area';

class AreaTableSeeder {
    
    constructor() {
        // code here ...
    }

    public async run(cn: DataSource = null) {
        if(cn.driver.options.type === 'sqlite')
            await cn.manager.query('DELETE FROM area;');
        else
            await cn.manager.query('TRUNCATE TABLE public.area RESTART IDENTITY CASCADE;');

        const area1 = new Area();
        area1.nombre = 'Recepción';
        area1.descripcion = 'Área de recepción de la empresa.';
        area1.estado = true;
        area1.orden = 1;

        const area2 = new Area();
        area2.nombre = 'Secretaría de Consejo Directivo';
        area2.descripcion = 'Área de secretaría de consejo directivo.';
        area2.estado = true;
        area2.orden = 2;

        const area3 = new Area();
        area3.nombre = 'Matriculados'
        area3.descripcion = 'Área de matriculados.';
        area3.estado = true;
        area3.orden = 3;

        await cn.manager.save([area1, area2, area3]);
    }
}

export default new AreaTableSeeder();