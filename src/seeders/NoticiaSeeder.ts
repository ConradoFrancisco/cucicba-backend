import { DataSource } from "typeorm";
import { Noticia } from "../entity/Noticia";

class NoticiaSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM categoria_post");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.categoria_post RESTART IDENTITY CASCADE;"
      );

    const noticia1 = new Noticia();
    noticia1.cuerpo = "Cuerpo de noticia";
    noticia1.descripcion = "descripcion noticia";
    noticia1.fecha = new Date();
    noticia1.orden = 1;
    noticia1.titulo = "titulo noticia";
    await cn.manager.save([noticia1]);
  }
}

export default new NoticiaSeeder();
