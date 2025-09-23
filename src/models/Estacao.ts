import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import TipoParametro from './TipoParametro';
import EstacaoTipoParametro from './EstacaoTipoParametro';

@Table({
    tableName: 'estacoes',
    timestamps: false
})
export default class Estacao extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    pk!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    uuid!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    nome!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    descricao!: string;

    @Column({
        type: DataType.BLOB('long'),
        allowNull: true
    })
    imagem!: Buffer | null;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    status!: boolean;

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    lat!: string | null;

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    long!: string | null;

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    endereco!: string | null;

    @BelongsToMany(() => TipoParametro, () => EstacaoTipoParametro, 'estacao_est_pk', 'tipo_parametro_pk')
    tipoParametros!: TipoParametro[];
}
