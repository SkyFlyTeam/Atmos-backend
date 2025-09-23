import { Request, Response } from 'express'
import Estacao from '../models/Estacao'

export const estacaoController = {
    save: async (req: Request, res: Response) => {
        try {
            const { imagemBase64, ...dados } = req.body;

            const novoRegistro = await Estacao.create({
                ...dados,
                imagem: imagemBase64
                    ? Buffer.from(imagemBase64.split(",")[1], "base64")
                    : null
            });

            return res.status(201).json(novoRegistro);
        } catch (error: any) {
            return res.status(400).json({
                error: 'Erro ao salvar estação',
                detalhes: error.message
            });
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const registros = await Estacao.findAll();

            if (!registros.length) {
                return res.status(404).json({ error: 'Registros não encontrados' });
            }

            // Converte cada registro para JSON e adiciona imagemBase64 se tiver
            const resultado = registros.map((registro) => {
                const json = registro.toJSON() as any;
                if (registro.imagem) {
                    json.imagemBase64 = `data:image/jpeg;base64,${registro.imagem.toString("base64")}`;
                }
                return json;
            });

            return res.status(200).json(resultado);
        } catch (error: any) {
            return res.status(500).json({
                error: 'Erro ao buscar registros',
                detalhes: error.message
            });
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params
            const registro = await Estacao.findByPk(pk)
            if (registro) {
                const json = registro.toJSON();
                if (registro.imagem) {
                    json.imagemBase64 = `data:image/jpeg;base64,${registro.imagem.toString("base64")}`;
                }
                return res.status(200).json(json);
            }

            return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
            return res.status(500).json({
                error: 'Erro ao buscar registro',
                detalhes: error.message
            });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params;
            const { imagemBase64, ...dados } = req.body;

            const registro = await Estacao.findByPk(pk);
            if (!registro) {
                return res.status(404).json({ error: 'Registro não encontrado' });
            }

            // Processar imagem
            let imagemData = registro.imagem; // mantém a atual por padrão

            if (imagemBase64 === null) {
                // pediu explicitamente para remover
                imagemData = null;
            } else if (typeof imagemBase64 === 'string' && imagemBase64.startsWith('data:image')) {
                // veio uma nova imagem em Base64
                imagemData = Buffer.from(imagemBase64.split(",")[1], "base64");
            }
            // Se não enviou nada (undefined), mantém a atual

            await registro.update({
                ...dados,
                imagem: imagemData
            });

            return res.json(registro);
        } catch (error: any) {
            return res.status(400).json({
                error: 'Erro ao atualizar estação',
                detalhes: error.message
            });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params;

            const deletado = await Estacao.destroy({ where: { pk } });

            if (deletado) {
                return res.status(204).send();
            }

            return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao deletar registro', detalhes: error.message });
        }
    }
} 