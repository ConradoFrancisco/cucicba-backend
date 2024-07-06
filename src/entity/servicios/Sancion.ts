import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsDate, IsNotEmpty, Length } from "class-validator";
import { CategoriaSancion } from "./Categoria_sancion";

@Entity({ name: "sancion" })
export class Sancion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(2, 255)
  descripcion: string;

  @Column({ default: false })
  @IsBoolean()
  estado: boolean;

  @Column({ default: "" })
  @IsNotEmpty()
  @Length(2, 255)
  archivo: string;

  @ManyToOne(
    () => CategoriaSancion,
    (categoriaSancion) => categoriaSancion.sanciones
  )
  categoria: CategoriaSancion;

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
