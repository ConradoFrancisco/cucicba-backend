export class DeleteParamsDto {
  public id: number;
  public deletedAt: Date;

  constructor(body: any) {
    this.id = parseInt(body.id);
    this.deletedAt = new Date();
  }
}
