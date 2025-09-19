import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import Estacao from './Estacao';
import EstacaoTipoParametro from './EstacaoTipoParametro';
import TipoAlerta from './TipoAlerta';
import TipoAlertaParametro from './TipoAlertaParametro';

@Table({
    tableName: 'tipo_parametro',
    timestamps: false
})
export default class TipoParametro extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    pk!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    json_id!: string | null;

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    nome!: string | null;

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    tipo!: string | null;

    @Column({
        type: DataType.DECIMAL(8, 4),
        allowNull: true
    })
    offset!: number | null;

    @Column({
        type: DataType.DECIMAL(8, 4),
        allowNull: true
    })
    fator!: number | null;

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    polinomio!: string | null;

    @Column({
        type: DataType.STRING(20),
        allowNull: true
    })
    unidade!: string | null;

    @Column({
        type: DataType.FLOAT,
        allowNull: true
    })
    alarme!: number | null;

    @BelongsToMany(() => Estacao, () => EstacaoTipoParametro, 'tipo_parametro_pk', 'estacao_est_pk')
    estacoes!: Estacao[];

    @BelongsToMany(() => TipoAlerta, () => TipoAlertaParametro, 'Tipo_parametro_p', 'Tipo_Alerta_pk')
    tipoAlertas!: TipoAlerta[];
}
