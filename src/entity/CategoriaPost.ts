import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty, Max, Min } from "class-validator";
import { PostBiblioteca } from "./PostBiblioteca";


@Entity({ name: "categoria_post" })
export class CategoriaPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  nombre: string;

  @OneToMany(() => PostBiblioteca, (post) => post.categoria)
  posts: PostBiblioteca[];
}
