import { PostBiblioteca } from "../../entity/servicios/PostBiblioteca";
import { Revista } from "../../entity/servicios/Revista";

export class RevistaDto {
  id?: number;
  descripcion: string;
  archivo: string;
  fecha: Date;
  estado: boolean;
  imagen: string;

  constructor(revista: Revista) {
    this.id = revista.id ? parseInt(revista.id.toString()) : null;
    this.descripcion = revista.descripcion;
    this.archivo = revista.archivo;
    this.fecha = revista.fecha;
    this.estado = revista.estado;
    this.imagen = revista.imagen;
  }
}
/* 
this.id = preguntaFrecuente.id ? parseInt(preguntaFrecuente.id.toString()) : null;
      this.pregunta = preguntaFrecuente.pregunta;
      this.respuesta = preguntaFrecuente.respuesta;
      this.estado = preguntaFrecuente.estado;
      this.categoria = preguntaFrecuente.categoria ? { id: preguntaFrecuente.categoria.id, nombre: preguntaFrecuente.categoria.nombre } : null; */
