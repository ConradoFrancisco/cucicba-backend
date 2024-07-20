import { Area } from "../entity/Area";

export class ParamsDto {
  public input: string;
  public direccion?: string;
  public orden: number;
  public orderBy?: string;
  public orderDirection: string;
  public estado?: boolean;
  public limit: number;
  public offset: number;
  public penal?: boolean;
  public categoriaId?: number;
  public area?: any;
  constructor(body: any) {
    const inp: string = body.input || "";
    this.setLimit(body);
    this.input = body.input !== null ? inp.trim() : null;
    this.direccion = body.direccion ? body.direccion : null;
    this.orden = body.orden ? parseInt(body.orden) : null;
    this.orderBy = body.orderBy ? body.orderBy : "id";
    this.estado =
      body.estado !== "" || body.estado !== null ? body.estado : null;
    this.setOrderDirection(body);
    this.offset = parseInt(body.offset) || 0;
    this.penal = body.penal !== null ? body.penal : null;
    this.categoriaId = body.categoria ? parseInt(body.categoria) : null;
    this.area = body.area ? body.area : null;
  }

  private setLimit(body: any) {
    this.limit = 15;
    if (body.limit) {
      this.limit = parseInt(body.limit) > 50 ? 50 : parseInt(body.limit);
    }
  }

  private setOrderDirection(body: any) {
    this.orderDirection =
      body.orderDirection !== null && body.orderDirection === "DESC"
        ? body.orderDirection
        : "ASC";
  }
}
