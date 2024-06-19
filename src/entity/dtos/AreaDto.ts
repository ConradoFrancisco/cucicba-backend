export class AreaDto {
    id: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
    orden?: number;
  
    constructor(area: any) {
      this.id = area.id;
      this.nombre = area.nombre;
      this.descripcion = area.descripcion;
      this.estado = area.estado;
      this.orden = area.orden;
    }
  }