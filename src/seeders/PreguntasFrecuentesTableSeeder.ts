import { DataSource } from "typeorm";
import { PreguntaFrecuente } from "../entity/servicios/PreguntaFrecuente";
import { CategoriasPreguntasFrecuentes } from "../entity/servicios/Categoria_pregunta_frecuente";
import { preguntasFrecuentesArray } from "./objects/PreguntasFrecuentesObject";

class PreguntasFrecuentesTableSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM pregunta_frecuente;");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.pregunta_frecuente RESTART IDENTITY CASCADE;"
      );
    const categorias = await cn.manager.find(CategoriasPreguntasFrecuentes);
    const categoriaAsesoramientoImpositivo = categorias.find(
      (cat) => cat.nombre === "ASESORAMIENTO IMPOSITIVO"
    );
    for (const frecuente of preguntasFrecuentesArray) {
      const nuevaPregunta = new PreguntaFrecuente();
      nuevaPregunta.pregunta = frecuente.pregunta;
      nuevaPregunta.respuesta = frecuente.respuesta;
      nuevaPregunta.categoria = categorias.find(
        (cat) => cat.nombre === frecuente.categoria
      );
      nuevaPregunta.estado = true;
      await cn.manager.save(nuevaPregunta);
    }
  }
}

export default new PreguntasFrecuentesTableSeeder();
