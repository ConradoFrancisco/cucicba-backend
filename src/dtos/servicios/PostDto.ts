import { PostBiblioteca } from "../../entity/PostBiblioteca";

export class PostDto {
  id?: number;
  descripcion: string;
  archivo: string;
  fecha: Date;
  estado: boolean;
  categoria: { id: number; nombre: string };

  constructor(post: PostBiblioteca) {
    this.id = post.id ? parseInt(post.id.toString()) : null;
    this.descripcion = post.descripcion;
    this.archivo = post.archivo;
    this.fecha = post.fecha;
    this.estado = post.estado;
    this.categoria = {
      id: post.categoria.id,
      nombre: post.categoria.nombre,
    };
  }
}
/* 
this.id = preguntaFrecuente.id ? parseInt(preguntaFrecuente.id.toString()) : null;
      this.pregunta = preguntaFrecuente.pregunta;
      this.respuesta = preguntaFrecuente.respuesta;
      this.estado = preguntaFrecuente.estado;
      this.categoria = preguntaFrecuente.categoria ? { id: preguntaFrecuente.categoria.id, nombre: preguntaFrecuente.categoria.nombre } : null; */
