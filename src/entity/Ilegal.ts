import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsDate, IsNotEmpty, Max, Min } from "class-validator";

@Entity({ name: "inmobiliaria_ilegal" })
export class Ilegal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  nombre: string;

  @Column()
  @IsDate()
  fecha: Date;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  direccion: string;

  @Column({ default: false })
  @IsBoolean()
  estado: boolean;

  @Column({ default: false })
  @IsBoolean()
  penal: boolean;

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

/* import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../../Database';

class InmobiliariasIlegales extends Model {}

InmobiliariasIlegales.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  causa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
}, {
  sequelize,
  modelName: 'InmobiliariasIlegales',
  tableName: 'InmobiliariasIlegales',
  timestamps: false,
});

export { InmobiliariasIlegales }; */
