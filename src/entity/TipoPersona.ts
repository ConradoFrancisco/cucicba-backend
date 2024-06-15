import { IsDate } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "tipo_persona" })
export class TipoPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @CreateDateColumn({ name: "created_at" })
  @IsDate()
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @IsDate()
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @IsDate()
  deletedAt!: Date;
}
