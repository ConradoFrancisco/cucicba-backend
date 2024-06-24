export class AreaDto {
  id?: number;
  nombre: string;
  descripcion: string;
  estado?: boolean;
  orden?: number;

  constructor(area: any) {
    this.id = area.id ? parseInt(area.id) : null;
    this.nombre = area.nombre;
    this.descripcion = area.descripcion;
    this.estado = area.estado ? area.estado : false;
    this.orden = parseInt(area.orden);
  }
}
