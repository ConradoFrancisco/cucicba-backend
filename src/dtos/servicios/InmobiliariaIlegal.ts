export class InmobiliariaIlegalDto {
  id?: number;
  nombre: string;
  fecha: Date;
  estado: boolean;
  direccion: string;
  penal: boolean;

  constructor(ilegal: any) {
    this.id = ilegal.id ? parseInt(ilegal.id) : null;
    this.nombre = ilegal.nombre;
    this.fecha = ilegal.fecha;
    this.estado = ilegal.estado;
    this.direccion = ilegal.direccion;
    this.penal = ilegal.penal;
  }
}
