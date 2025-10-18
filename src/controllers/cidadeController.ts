import { Request, Response } from 'express'
import Cidade from '../models/Cidade'

export const cidadeController = {
    findAll: async (req: Request, res: Response) => {
        try {
            const registros = await Cidade.findAll()
            if(!registros.length){
                return res.status(404).json({ error: 'Registros de cidade não encontrados' })
            }
            return res.status(200).json(registros)
        } catch (error) {
            return res.status(500).json({error: 'Erro ao buscar registros de cidade', detalhes: error.message})
        }
    }
}

