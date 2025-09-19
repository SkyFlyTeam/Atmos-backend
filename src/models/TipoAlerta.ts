import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import TipoParametro from './TipoParametro';
import TipoAlertaParametro from './TipoAlertaParametro';

@Table({
    tableName: 'tipo_alerta',
    timestamps: false
})
export default class TipoAlerta extends Model {

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
        type: DataType.TEXT,
        allowNull: true
    })
    descricao!: string | null;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true
    })
    publica!: boolean | null;

    @Column({
        type: DataType.SMALLINT,
        allowNull: true
    })
    tipo_alarme!: number | null;

    @Column({
        type: DataType.DECIMAL(8, 4),
        allowNull: true
    })
    p1!: number | null;

    @Column({
        type: DataType.DECIMAL(8, 4),
        allowNull: true
    })
    p2!: number | null;

    @BelongsToMany(() => TipoParametro, () => TipoAlertaParametro, 'Tipo_Alerta_pk', 'Tipo_parametro_p')
    tipoParametros!: TipoParametro[];
}

