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
import { CategoriaPost } from "./Categoria_post";

@Entity({ name: "post_biblioteca" })
export class PostBiblioteca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  fecha: Date;

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

  @ManyToOne(() => CategoriaPost, (categoriapost) => categoriapost.posts)
  categoria: CategoriaPost;

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
