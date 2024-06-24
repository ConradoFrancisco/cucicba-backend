import { DataSource } from "typeorm";
import { Infractor } from "../entity/servicios/Infractor";
import { CategoriasPreguntasFrecuentes } from "../entity/servicios/Categoria_pregunta_frecuente";

class PreguntasFrecuentesCategoriasTableSeeder {
    public async run(cn: DataSource = null) {
        if (cn.driver.options.type === "sqlite")
            await cn.manager.query("DELETE FROM categorias_preguntas_frecuentes;");
        else
            await cn.manager.query(
                "TRUNCATE TABLE public.categorias_preguntas_frecuentes RESTART IDENTITY CASCADE;"
            );

        const categoria1 = new CategoriasPreguntasFrecuentes();
        categoria1.nombre = "ASESORAMIENTO IMPOSITIVO";
        const categoria2 = new CategoriasPreguntasFrecuentes();
        categoria2.nombre = "ASESORAMIENTO LEGAL";
        const categoria3 = new CategoriasPreguntasFrecuentes();
        categoria3.nombre = "ASESORAMIENTO NOTARIAL";
        const categoria4 = new CategoriasPreguntasFrecuentes();
        categoria4.nombre = "ATENCIÓN AL MATRICULADO";
        const categoria5 = new CategoriasPreguntasFrecuentes();
        categoria5.nombre = "BAJA DE MATRICULA";
        const categoria6 = new CategoriasPreguntasFrecuentes();
        categoria6.nombre = "CABAPROP";
        const categoria7 = new CategoriasPreguntasFrecuentes();
        categoria7.nombre = "INFORMES COMERCIALES. EMPRESAS FIDELITAS";
        const categoria8 = new CategoriasPreguntasFrecuentes();
        categoria8.nombre = "INFORMES DEL REGISTRO DE LA PROPIEDAD DEL INMUEBLE";
        const categoria9 = new CategoriasPreguntasFrecuentes();
        categoria9.nombre = "LICENCIA POR PASIVIDAD";
        const categoria10 = new CategoriasPreguntasFrecuentes();
        categoria10.nombre = "MATRICULACIÓN";
        const categoria11 = new CategoriasPreguntasFrecuentes();
        categoria11.nombre = "MEDIOS DE PAGO";
        const categoria12 = new CategoriasPreguntasFrecuentes();
        categoria12.nombre = "PLANEAMIENTO URBANO";

            
        await cn.manager.save([categoria1, categoria2, categoria3, categoria4, categoria5, categoria6, categoria7, categoria8, categoria9, categoria10, categoria11, categoria12]);
    }
}

export default new PreguntasFrecuentesCategoriasTableSeeder();
