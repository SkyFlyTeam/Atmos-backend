import { Table, Column, Model, DataType, HasMany, Unique } from 'sequelize-typescript';
import Estacao from './Estacao';

@Table({ tableName: 'cidades', timestamps: false })
export default class Cidade extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  pk!: number;

  @Unique
  @Column({ type: DataType.INTEGER, allowNull: false })
  ibgeId!: number;

  @Column({ type: DataType.STRING(120), allowNull: false })
  nome!: string;

  @Column({ type: DataType.STRING(2), allowNull: false })
  uf!: string;

  @HasMany(() => Estacao)
  estacoes!: Estacao[];
}