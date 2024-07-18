import { DataSource } from "typeorm";
import { Noticia } from "../entity/Noticia";
import { ImagenNoticia } from "../entity/ImagenNoticia";

class ImagenNoticiaSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM imagen_noticia");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.imagen_noticia RESTART IDENTITY CASCADE;"
      );
    const noticias = await cn.manager.find(Noticia);
    const noticia1 = noticias.find((noticia) => noticia.id === 1);
    const noticia2 = noticias.find((noticia) => noticia.id === 2);
    const noticia3 = noticias.find((noticia) => noticia.id === 3);
    const noticia4 = noticias.find((noticia) => noticia.id === 4);
    const noticia5 = noticias.find((noticia) => noticia.id === 5);

    const imagen1 = new ImagenNoticia();
    imagen1.url = "uploads/file-1717079144501-911263434.jpg";
    imagen1.noticia = noticia1;
    const imagen2 = new ImagenNoticia();
    imagen2.url = "uploads/file-1717079151790-156723353.jpg";
    imagen2.noticia = noticia1;
    const imagen3 = new ImagenNoticia();
    imagen3.url = "uploads/file-1717448499215-505147572.jpg";
    imagen3.noticia = noticia2;
    const imagen4 = new ImagenNoticia();
    imagen4.url = "uploads/file-1717448563452-677332903.jpg";
    imagen4.noticia = noticia3;
    const imagen5 = new ImagenNoticia();
    imagen5.url = "uploads/file-1717079151790-156723353.jpg";
    imagen5.noticia = noticia4;
    const imagen6 = new ImagenNoticia();
    imagen6.url = "uploads/file-1717079158182-18173429.jpg";
    imagen6.noticia = noticia5;

    await cn.manager.save([
      imagen1,
      imagen2,
      imagen3,
      imagen4,
      imagen5,
      imagen6,
    ]);
  }
}

export default new ImagenNoticiaSeeder();
