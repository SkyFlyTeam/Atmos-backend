import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import TipoParametro from './TipoParametro';
import TipoAlertaParametro from './TipoAlertaParametro';
import TipoAlerta from './TipoAlerta';
import ValorCapturado from './ValorCapturado';

@Table({
    tableName: 'tipo_alerta',
    timestamps: false
})
export default class Alerta extends Model {

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
    tipo!: string | null;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    data!: Date;

    @ForeignKey(() => TipoAlerta)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'tipo_alerta_pk'
    })
    tipo_alerta_pk!: number;

    @ForeignKey(() => ValorCapturado)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'valor_capturado_pk'
    })
    valor_capturado_pk!: number;    

    @BelongsTo(() => TipoAlerta)
    tipoAlerta!: TipoAlerta;

    @BelongsTo(() => ValorCapturado)
    valorCapturado!: ValorCapturado;
}

