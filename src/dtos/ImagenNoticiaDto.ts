import { ImagenNoticia } from "../entity/ImagenNoticia";
import { Noticia } from "../entity/Noticia";

export class ImagenNoticiaDto {
  id?: number;
  url: string;
  noticia: Noticia;

  constructor(imagenNoticia: ImagenNoticia) {
    this.id = imagenNoticia.id ? parseInt(imagenNoticia.id.toString()) : null;
    this.url = imagenNoticia.url;
    this.noticia = imagenNoticia.noticia;
  }
}
