import { Table, Column, Model, DataType, BelongsTo, ForeignKey, AfterCreate } from 'sequelize-typescript';
import EstacaoTipoParametro from './EstacaoTipoParametro';
import Estacao from './Estacao';
import TipoAlerta from './TipoAlerta';
import TipoParametro from './TipoParametro';
import Alerta from './Alerta';

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

    @AfterCreate
    static async verificarAlertas(instance: ValorCapturado) {
        try {
            // Buscar os tipos de alerta associados ao parâmetro deste valor capturado
            const tiposAlerta = await TipoAlerta.findAll({
                include: [
                    {
                        model: TipoParametro,
                        as: 'tipoParametros',
                        where: { pk: instance.Parametros_pk },
                        through: { attributes: [] }
                    }
                ]
            });

            // Para cada tipo de alerta, verificar se a condição foi excedida
            for (const tipoAlerta of tiposAlerta) {
                let deveCriarAlerta = false;

                // Verificar tipo de alarme
                switch (tipoAlerta.tipo_alarme) {
                    case 0: // Menor que (x < p1)
                        deveCriarAlerta = instance.valor < (tipoAlerta.p1 || 0);
                        break;
                    case 1: // Intervalo entre (p1 < x < p2)
                        deveCriarAlerta = instance.valor > (tipoAlerta.p1 || 0) && 
                                         instance.valor < (tipoAlerta.p2 || 0);
                        break;
                    case 2: // Maior que (x > p1)
                        deveCriarAlerta = instance.valor > (tipoAlerta.p1 || 0);
                        break;
                    case 3: // Diferente de (x != p1)
                        deveCriarAlerta = instance.valor !== tipoAlerta.p1;
                        break;
                    case 4: // Igual a (x == p1)
                        deveCriarAlerta = instance.valor === tipoAlerta.p1;
                        break;
                }

                // Se a condição for atendida, criar o alerta
                if (deveCriarAlerta) {
                    await Alerta.create({
                        tipo_alerta_pk: tipoAlerta.pk,
                        valor_capturado_pk: instance.pk,
                        data: new Date()
                    });

                    console.log(`Alerta criado: Tipo ${tipoAlerta.tipo} - Valor ${instance.valor}`);
                }
            }
        } catch (error) {
            console.error('Erro ao verificar alertas:', error);
        }
    }
}
