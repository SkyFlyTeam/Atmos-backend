import { Request, Response } from 'express'

export const controllerHello = {
    get_hello: async (req: Request, res: Response) => {
        try {
            const name = (req.query.name as string) || ''
            const predicate = name ? ` ${name}!` : " World!"
            const hello = `Hello${predicate}`
            return res.status(201).json(hello)
        } catch (error: any) {
            return res.status(400).json({ error: 'Erro ao salvar registro', detalhes: error.message })
        }
    } 
}