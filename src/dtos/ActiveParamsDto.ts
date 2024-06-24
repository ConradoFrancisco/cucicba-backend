export class ActiveParamsDto {
  public id: number;
  public estado: boolean;
  public updatedAt: Date;

  constructor(body: any) {
    this.id = parseInt(body.id);
    this.estado = body.estado;
    this.updatedAt = new Date();
  }
}
