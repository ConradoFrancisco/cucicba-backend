import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsDate, IsNotEmpty, Max, Min } from "class-validator";
import { CategoriasPreguntasFrecuentes } from "./Categoria_pregunta_frecuente";

@Entity({ name: "pregunta_frecuente" })
export class PreguntaFrecuente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Min(2)
    @Max(255)
    pregunta: string;

    @Column({ type: "text" })
    @IsNotEmpty()
    respuesta: string;

    @Column({ default: false })
    @IsBoolean()
    estado: boolean;

    @ManyToOne(() => CategoriasPreguntasFrecuentes, (categoria) => categoria.preguntasFrecuentes)
    categoria: CategoriasPreguntasFrecuentes;

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
