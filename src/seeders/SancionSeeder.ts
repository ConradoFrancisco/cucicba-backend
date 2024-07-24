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
    const post1 = new Sancion();
    post1.descripcion = "CUCIBA C BURGOS, LUCIA S- DENUNCIA EXPTE 676";
    post1.categoria = { id: 4 } as CategoriaSancion;
    post1.estado = true;
    post1.fecha = new Date("2024-04-26");
    post1.archivo = "uploads/file-1721121526875-259375158.pdf";

    const post2 = new Sancion();
    post2.descripcion =
      "EXPTE 857/23 - VEIGA, MONICA BALBINA C/ ARQ. ADRIANA STREGER BIENES RAICES S/ DENUNCIA";
    post2.categoria = { id: 3 } as CategoriaSancion;
    post2.estado = true;
    post2.fecha = new Date("2024-03-18");
    post2.archivo = "uploads/file-1720985434737-903551295.pdf";

    const post3 = new Sancion();
    post3.descripcion =
      "ROMERO, MARCELO D C REMAX PREMIUM S- DENUNCIA EXPTE 444";
    post3.categoria = { id: 1 } as CategoriaSancion;
    post3.estado = true;
    post3.fecha = new Date("2024-01-10");
    post3.archivo = "uploads/file-1720985158468-181385241.pdf";

    const post4 = new Sancion();
    post4.descripcion =
      "ALVAREZ, CARLOS GUSTAVO C/ ARIE L. WAJNSZTOK S/ DENUNCIA – Expte 733/21";
    post4.categoria = { id: 1 } as CategoriaSancion;
    post4.estado = true;
    post4.fecha = new Date("2018-09-12");
    post4.archivo = "uploads/file-1721121698854-948725177.pdf";

    await cn.manager.save([post1, post2, post3, post4]);
  }
}

export default new SancionSeeder();
