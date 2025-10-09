import { Request, Response } from 'express'
import Estacao from '../models/Estacao'
import Cidade from '../models/Cidade'  

// helper p/ montar a resposta
function mapEstacao(registro: Estacao) {
  const json: any = registro.toJSON();
  if (registro.imagem) {
    json.imagemBase64 = `data:image/jpeg;base64,${registro.imagem.toString('base64')}`;
  }
  // inclui dados da cidade (se houver)
  if ((registro as any).cidade) {
    const c = (registro as any).cidade as Cidade;
    json.cidadeIbgeId = c.ibgeId;
    json.cidadeNome = c.nome;
    json.cidadeUf = c.uf;
  } else {
    json.cidadeIbgeId = null;
    json.cidadeNome = null;
    json.cidadeUf = null;
  }
  return json;
}

export const estacaoController = {
  save: async (req: Request, res: Response) => {
    try {
      const { imagemBase64, cidadeIbgeId, cidadeNome, cidadeUf, ...dados } = req.body;

      // upsert da cidade (opcional)
      let cidadePk: number | null = null;
      if (cidadeIbgeId) {
        const [cidade] = await Cidade.findOrCreate({
          where: { ibgeId: Number(cidadeIbgeId) },
          defaults: { ibgeId: Number(cidadeIbgeId), nome: cidadeNome, uf: cidadeUf }
        });
        cidadePk = cidade.pk;
      }

      const novoRegistro = await Estacao.create({
        ...dados,
        cidadePk, // <— NOVO
        imagem: imagemBase64
          ? Buffer.from(String(imagemBase64).split(',')[1], 'base64')
          : null
      });

      // retorna já com cidade
      const criado = await Estacao.findByPk(novoRegistro.pk, { include: [Cidade] });
      return res.status(201).json(mapEstacao(criado!));
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao salvar estação', detalhes: error.message });
    }
  },

  findAll: async (_req: Request, res: Response) => {
    try {
      const registros = await Estacao.findAll({ include: [Cidade] }); // <— include

      if (!registros.length) {
        return res.status(404).json({ error: 'Registros não encontrados' });
      }

      return res.status(200).json(registros.map(mapEstacao));
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro ao buscar registros', detalhes: error.message });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const { pk } = req.params;
      const registro = await Estacao.findByPk(pk, { include: [Cidade] }); // <— include
      if (!registro) return res.status(404).json({ error: 'Registro não encontrado' });
      return res.status(200).json(mapEstacao(registro));
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro ao buscar registro', detalhes: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { pk } = req.params;
      const { imagemBase64, cidadeIbgeId, cidadeNome, cidadeUf, ...dados } = req.body;

      const registro = await Estacao.findByPk(pk);
      if (!registro) return res.status(404).json({ error: 'Registro não encontrado' });

      // imagem
      let imagemData = registro.imagem;
      if (imagemBase64 === null) {
        imagemData = null;
      } else if (typeof imagemBase64 === 'string' && imagemBase64.startsWith('data:image')) {
        imagemData = Buffer.from(imagemBase64.split(',')[1], 'base64');
      }

      // cidade (3 estados: manter, remover, trocar/criar)
      let cidadePk = registro.getDataValue('cidadePk') as number | null;
      if (cidadeIbgeId === null) {
        cidadePk = null; // remover cidade
      } else if (cidadeIbgeId !== undefined) {
        const [cidade] = await Cidade.findOrCreate({
          where: { ibgeId: Number(cidadeIbgeId) },
          defaults: { ibgeId: Number(cidadeIbgeId), nome: cidadeNome, uf: cidadeUf }
        });
        cidadePk = cidade.pk;
      }

      await registro.update({ ...dados, imagem: imagemData, cidadePk });

      const atualizado = await Estacao.findByPk(pk, { include: [Cidade] });
      return res.json(mapEstacao(atualizado!));
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao atualizar estação', detalhes: error.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { pk } = req.params;
      const deletado = await Estacao.destroy({ where: { pk } });
      if (deletado) return res.status(204).send();
      return res.status(404).json({ error: 'Registro não encontrado' });
    } catch (error: any) {
      return res.status(400).json({ error: 'Erro ao deletar registro', detalhes: error.message });
    }
  }
}
