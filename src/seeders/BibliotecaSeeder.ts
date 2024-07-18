import { DataSource } from "typeorm";
import { Infractor } from "../entity/servicios/Infractor";
import {} from "../entity/servicios/Categoria_pregunta_frecuente";
import { CategoriaPost } from "../entity/servicios/Categoria_post";
import { PostBiblioteca } from "../entity/servicios/PostBiblioteca";

class BibliotecaSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM post_biblioteca");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.post_biblioteca RESTART IDENTITY CASCADE;"
      );
    const categorias = await cn.manager.find(CategoriaPost);
    const categoria1 = categorias.find((cat) => cat.id === 1);

    const post1 = new PostBiblioteca();
    post1.descripcion = "descripcion del post1";
    post1.categoria = categoria1;
    post1.fecha = new Date();
    post1.archivo = "archivo.jpg";

    await cn.manager.save([post1]);
  }
}

export default new BibliotecaSeeder();
