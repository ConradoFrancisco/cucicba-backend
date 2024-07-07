import { DataSource } from "typeorm";
import { Infractor } from "../entity/servicios/Infractor";
import {} from "../entity/servicios/Categoria_pregunta_frecuente";
import { CategoriaPost } from "../entity/servicios/Categoria_post";

class CategoriaBibliotecaSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM categoria_post");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.categoria_post RESTART IDENTITY CASCADE;"
      );

    const categoria1 = new CategoriaPost();
    categoria1.nombre = "Aamparo individual a la ley 5859";
    const categoria2 = new CategoriaPost();
    categoria2.nombre = "Código de edificación en la ciudad de Buenos Aires";
    const categoria3 = new CategoriaPost();
    categoria3.nombre = "Cursos de capacitacion en el colegio";
    const categoria4 = new CategoriaPost();
    categoria4.nombre = "Ley de Alquileres 27551";
    const categoria5 = new CategoriaPost();
    categoria5.nombre =
      "Libro. Criterios de Tasaciones. Prof. Artemio Daniel Aguiar";
    const categoria6 = new CategoriaPost();
    categoria6.nombre = "Memoria y Balance 30-06-2021";
    const categoria7 = new CategoriaPost();
    categoria7.nombre = "Modelos de Asesoría Legal";
    const categoria8 = new CategoriaPost();
    categoria8.nombre = "Normas sobre los carteles inmobiliarios";
    const categoria9 = new CategoriaPost();
    categoria9.nombre = "Resoluciones CUCICBA";
    const categoria10 = new CategoriaPost();
    categoria10.nombre = "UIF - Lavado de dinero";

    await cn.manager.save([
      categoria1,
      categoria2,
      categoria3,
      categoria4,
      categoria5,
      categoria6,
      categoria7,
      categoria8,
      categoria9,
      categoria10,
    ]);
  }
}

export default new CategoriaBibliotecaSeeder();
