import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsDate, IsNotEmpty, Max, Min } from "class-validator";
import { ImagenNoticia } from "./ImagenNoticia";

@Entity({ name: "noticia" })
export class Noticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  titulo: string;

  @Column()
  @IsDate()
  fecha: Date;

  @Column()
  orden: number;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  descripcion: string;

  @Column("text")
  @IsNotEmpty()
  cuerpo: string;

  @Column({ default: false })
  @IsBoolean()
  estado: boolean;

  @CreateDateColumn({ name: "created_at" })
  @IsDate()
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @IsDate()
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @IsDate()
  deletedAt!: Date;

  @OneToMany(() => ImagenNoticia, (imagenNoticia) => imagenNoticia.noticia)
  imagenes: ImagenNoticia[];
}
