import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import Estacao from './Estacao';
import TipoParametro from './TipoParametro';
import ValorCapturado from './ValorCapturado';

@Table({
    tableName: 'parametro',
    timestamps: false
})
export default class EstacaoTipoParametro extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    pk!: number;

    @ForeignKey(() => Estacao)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'estacao_est_pk'
    })
    estacao_est_pk!: number;

    @ForeignKey(() => TipoParametro)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'tipo_parametro_pk'
    })
    tipo_parametro_pk!: number;

    @BelongsTo(() => Estacao)
    estacao!: Estacao;

    @BelongsTo(() => TipoParametro)
    tipoParametro!: TipoParametro;

    @HasMany(() => ValorCapturado, 'Parametros_pk')
    valoresCapturados!: ValorCapturado[];
}
