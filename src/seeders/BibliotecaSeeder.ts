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

    const post1 = new PostBiblioteca();
    post1.descripcion = "Tasaciones Residenciales";
    post1.categoria = { id: 3 } as CategoriaPost;
    post1.estado = true;
    post1.fecha = new Date("2024-04-23");
    post1.archivo = "uploads/file-1721121526875-259375158.pdf";

    const post2 = new PostBiblioteca();
    post2.descripcion =
      "Nueva Res. 43/2024 de la UIF para los Sujetos Obligados Corredores Inmobiliarios";
    post2.categoria = { id: 10 } as CategoriaPost;
    post2.estado = true;
    post2.fecha = new Date("2024-03-18");
    post2.archivo = "uploads/file-1720985434737-903551295.pdf";

    const post3 = new PostBiblioteca();
    post3.descripcion = "2024 - CONTRATO DE LOCACION VIVIENDA (DNU 70-2023)";
    post3.categoria = { id: 7 } as CategoriaPost;
    post3.estado = true;
    post3.fecha = new Date("2024-01-10");
    post3.archivo = "uploads/file-1720985158468-181385241.pdf";

    const post4 = new PostBiblioteca();
    post4.descripcion = "Código de Edificación de la Ciudad de Buenos Aires";
    post4.categoria = { id: 2 } as CategoriaPost;
    post4.estado = true;
    post4.fecha = new Date("2018-09-12");
    post4.archivo = "uploads/file-1721121698854-948725177.pdf";

    await cn.manager.save([post1, post2, post3, post4]);
  }
}

export default new BibliotecaSeeder();
