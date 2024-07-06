import { Sancion } from "../../entity/servicios/Sancion";

export class SancionDto {
  id?: number;
  descripcion: string;
  archivo: string;
  created_at?: Date;
  estado: boolean;
  categoria: { id: number; nombre: string };

  constructor(sancion: Sancion) {
    this.id = sancion.id ? parseInt(sancion.id.toString()) : null;
    this.descripcion = sancion.descripcion;
    this.archivo = sancion.archivo;
    this.created_at = sancion.createdAt ? sancion.createdAt : null;
    this.estado = sancion.estado;
    this.categoria = {
      id: sancion.categoria.id,
      nombre: sancion.categoria.nombre,
    };
  }
}
/* 
this.id = preguntaFrecuente.id ? parseInt(preguntaFrecuente.id.toString()) : null;
      this.pregunta = preguntaFrecuente.pregunta;
      this.respuesta = preguntaFrecuente.respuesta;
      this.estado = preguntaFrecuente.estado;
      this.categoria = preguntaFrecuente.categoria ? { id: preguntaFrecuente.categoria.id, nombre: preguntaFrecuente.categoria.nombre } : null; */
