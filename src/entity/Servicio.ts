import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsUrl, Max, Min } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'services'})
export class Servicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Min(3)
    @Max(255)
    title!: string;

    @Column()
    @IsUrl()
    url!: string;

    @Column()
    @IsNotEmpty()
    icon!: string;

    @Column()
    @IsNumber()
    @IsPositive()
    order!: number;

    @Column({default: false})
    activo!: boolean;

    @CreateDateColumn({name: 'created_at'})
    @IsDate()
    createdAt!: Date;

    @UpdateDateColumn({name: 'updated_at'})
    @IsDate()
    updatedAt!: Date;

    @DeleteDateColumn({name: 'deleted_at'})
    @IsDate()
    deletedAt!: Date;
}