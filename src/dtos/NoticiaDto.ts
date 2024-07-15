export class NoticiaDto {
  id?: number;
  titulo: string;
  descripcion: string;
  cuerpo: string;
  estado?: boolean;
  orden?: number;
  fecha?: Date;

  constructor(noticia: any) {
    this.id = noticia.id ? parseInt(noticia.id) : null;
    this.titulo = noticia.titulo;
    this.descripcion = noticia.description;
    this.estado = noticia.estado ? noticia.estado : false;
    this.orden = parseInt(noticia.orden);
  }
}
