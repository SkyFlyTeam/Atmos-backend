import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import TipoAlerta from './TipoAlerta';
import TipoParametro from './TipoParametro';

@Table({
    tableName: 'tipo_alerta_parametro',
    timestamps: false
})
export default class TipoAlertaParametro extends Model {

    @ForeignKey(() => TipoParametro)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'Tipo_parametro_p'
    })
    Tipo_parametro_p!: number;

    @ForeignKey(() => TipoAlerta)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'Tipo_Alerta_pk'
    })
    Tipo_Alerta_pk!: number;

    @BelongsTo(() => TipoParametro)
    tipoParametro!: TipoParametro;

    @BelongsTo(() => TipoAlerta)
    tipoAlerta!: TipoAlerta;
}

