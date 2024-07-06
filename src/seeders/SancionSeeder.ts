import { DataSource } from "typeorm";
import { PreguntaFrecuente } from "../entity/servicios/PreguntaFrecuente";
import { CategoriasPreguntasFrecuentes } from "../entity/servicios/Categoria_pregunta_frecuente";
import { Sancion } from "../entity/servicios/Sancion";
import { CategoriaSancion } from "../entity/servicios/Categoria_sancion";

class SancionSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM sancion;");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.sancion RESTART IDENTITY CASCADE;"
      );
    const categorias = await cn.manager.find(CategoriaSancion);
    const categoria1 = categorias.find((cat) => cat.id === 3);
    const pregunta1 = new Sancion();
    pregunta1.archivo = "archivoasdasd";
    pregunta1.categoria = categoria1;
    pregunta1.descripcion = "desc";
    pregunta1.createdAt = new Date();

    await cn.manager.save([pregunta1]);
  }
}

export default new SancionSeeder();
