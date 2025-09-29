import { Request } from "express";
import jwt from 'jsonwebtoken'





const AuthToken = (req: Request) => {
    try {
        const token = req.headers['authorization'];
        const auth = jwt.verify(token, process.env.JWT_KEY);
        
        if(!auth)
            return { status: 401, message: 'Token inválido.' };

        return { status: 200, message: 'Token válido.', token: auth };
    } catch (error) {
        let msg: string;
        switch(error.message){
            case 'jwt expired':
                msg = 'Token expirado.';
                break;
            case 'jwt must be provided':
                msg = 'Token não providenciado.';
                break;
            default:
                msg = 'Token inválido.';
        }

        return { status: 401, message: msg, detalhes: error.message, token: null };
    }
}

export default AuthToken;