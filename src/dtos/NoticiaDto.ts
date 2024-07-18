import { Noticia } from "../entity/Noticia";

export class NoticiaDto {
  id?: number;
  titulo: string;
  descripcion: string;
  cuerpo: string;
  estado?: boolean;
  orden?: number;
  fecha?: Date;
  imagenes?: string[];
  previousId: number | null;
  nextId: number | null;
  constructor(noticia: any) {
    this.id = noticia.id ? parseInt(noticia.id.toString()) : null;
    this.titulo = noticia.titulo;
    this.descripcion = noticia.descripcion;
    this.estado = noticia.estado ? noticia.estado : false;
    this.orden = noticia.orden ? parseInt(noticia.orden.toString()) : null;
    this.cuerpo = noticia.cuerpo;
    this.fecha = noticia.fecha;
    this.imagenes = noticia.imagenes ? noticia.imagenes : [];
    this.previousId = null;
    this.nextId = null;
  }
}
