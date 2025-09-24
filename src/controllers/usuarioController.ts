import { Request, Response } from 'express'
import Usuario from '../models/Usuario'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const saltRounds = 10; 

export const usuarioController = {
    save: async (req: Request, res: Response) => {
        try {
            //const { nome, email, senha } = req.body
            const reg = req.body

            if (!reg.nome || !reg.email || !reg.senha) {
                return res.status(401).json({ message: 'Nome, email e senha são obrigados!' })
            }

            reg.senha = await bcrypt.hash(reg.senha, saltRounds)

            const novoRegistro = await Usuario.create(reg)
            return res.status(201).json(novoRegistro)
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao salvar usuário', detalhes: error.message })
        }
    },

    findAll: async (req: Request, res: Response) => {
        try {
            const registros = await Usuario.findAll()
            if (registros) {
                return res.status(200).json(registros)
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar registros', detalhes: error.message })
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            let { pk } = (req.params)
            const id = parseInt(pk)
            const registro = await Usuario.findByPk(id)
            if (registro) {
                return res.status(200).json(registro)
            }
            return res.status(404).json({ error: 'Registro não encontrado' })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar registro', detalhes: error.message })
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { email, senha } = req.body
            const registro = await Usuario.findOne({ where: { email: email } })

            
            if (!registro)
                return res.status(404).json({ error: 'Registro não encontrado' })

            if (!(await bcrypt.compare(senha, registro.senha)))
                return res.status(404).json({ error: 'Credencial inválida' })
            
            const token = jwt.sign(
                { id: registro.id, nome: registro.nome, email: registro.email },
                process.env.JWT_KEY,
                {   expiresIn: (process.env.JWT_LIFE ? process.env.JWT_LIFE : "120s") }
            );

            return res.status(200).json({
                id: registro.id,
                nome: registro.nome,
                email: registro.email,
                token: token
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar registro', detalhes: error.message })
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params;
            const novoRegistro = req.body;

            const registro = await Usuario.findByPk(pk)
            if (!registro) {
                return res.status(404).json({ error: 'Registro não encontrado' })
            }

            if(novoRegistro.senha != registro.senha)
                novoRegistro.senha = await bcrypt.hash(novoRegistro.senha, saltRounds)

            const atualizado = await Usuario.update(novoRegistro, { where: { pk } });

            if (atualizado) {
                const registro = await Usuario.findByPk(pk);
                return res.json(registro);
            }

            return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao atualizar registro', detalhes: error.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { pk } = req.params

            const deletado = await Usuario.destroy({ where: { pk } });

            if (deletado) {
                return res.status(204).send();
            }

            return res.status(404).json({ error: 'Registro não encontrado' });
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao deletar registro', detalhes: error.message });
        }
    }
} 