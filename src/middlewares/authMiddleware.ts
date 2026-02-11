import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Token não enviado." });
    }
    const token = authorization.split(' ')[1];

    try {
        const secret = process.env.JWT_SECRET || 'chave_reserva_segura';
        const data = jwt.verify(token, secret);
        
        const { id } = data as TokenPayload;

        (req as any).userId = id;

        return next();
    } catch {
        return res.status(401).json({ error: "Token inválido ou expirado." });
    }
};