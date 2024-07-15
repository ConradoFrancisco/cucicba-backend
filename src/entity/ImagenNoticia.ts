import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsDate, IsNotEmpty, IsUrl } from "class-validator";
import { Noticia } from "./Noticia";

@Entity({ name: "imagen_noticia" })
export class ImagenNoticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  url: string;

  @ManyToOne(() => Noticia, (noticia) => noticia.imagenes)
  noticia: Noticia;

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
