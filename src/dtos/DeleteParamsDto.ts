export class DeleteParamsDto {
  public id: number;
  public deletedAt: Date;

  constructor(body: {id:string}) {
    this.id = parseInt(body.id);
    this.deletedAt = new Date();
  }
}
