import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import EstacaoTipoParametro from './EstacaoTipoParametro';
import Estacao from './Estacao';

@Table({
    tableName: 'valor_capturado',
    timestamps: false
})
export default class ValorCapturado extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    pk!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'unixtime'
    })
    unixtime!: Date;

    @ForeignKey(() => EstacaoTipoParametro)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'Parametros_pk'
    })
    Parametros_pk!: number;

    @Column({
        type: DataType.DECIMAL(8, 4),
        allowNull: false
    })
    valor!: number;

    @ForeignKey(() => Estacao)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'estacao_id'
    })
    estacao_id!: number;

    @BelongsTo(() => EstacaoTipoParametro)
    parametro!: EstacaoTipoParametro;

    @BelongsTo(() => Estacao)
    estacao!: Estacao;
}
