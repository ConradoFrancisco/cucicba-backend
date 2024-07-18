import { Area } from "../../entity/Area";
import { Personal } from "../../entity/institucional/Personal";

export class PersonalDto {
  id?: number;
  nombre: string;
  apellido: string;
  telefono?: string;
  email?: string;
  posicion?: string;
  estado?: boolean;
  orden?: number;
  areaId?: number;
  area?: any;

  constructor(personal: Personal, get?: boolean) {
    this.id = personal.id ? parseInt(personal.id.toString()) : null;
    this.telefono = personal.telefono || null;
    this.email = personal.email || null;
    this.posicion = personal.posicion || null;
    this.estado = personal.estado || false;
    this.orden = personal.orden ? parseInt(personal.orden.toString()) : null;
    this.areaId = personal.area ? personal.area.id : null;
    this.area = get && personal.area ? personal.area.nombre : personal.area;

    if (get) {
      this.setNombre(personal);
    } else {
      this.nombre = personal.nombre;
      this.apellido = personal.apellido;
    }
  }

  private setNombre(personal: Personal) {
    this.nombre = `${personal.nombre} ${personal.apellido}`;
  }
}
