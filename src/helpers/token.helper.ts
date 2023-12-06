import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface Payload {
    id: number,
    email: string,
    name: string
}

export const generateToken = (payload: Payload): string => {
    const secretKey: string = process.env.SECRET_KEY || 'SECRET';

    return jwt.sign(payload, secretKey, { expiresIn: '8h' });
}

export const verifyToken = (token: string): Payload | null => {
    const secretKey: string = process.env.SECRET_KEY || 'SECRET';

    try {
        const decoded = jwt.verify(token, secretKey) as Payload;
        return decoded;
    } catch (error: any) {
        console.error('Error al verificar el token:', error.message);
        return null;
    }
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "No ingreso un token" });
    }

    const token = req.headers.authorization.split(' ').pop() as string;

    if (!token) {
        return res.status(400).send({ error: "Token no encontrado" });
    }

    try {
        const tokenData = await verifyToken(token);

        if (tokenData && tokenData.id) {
            next();
        } else {
            return res.status(401).send({ error: "Token inválido" });
        }
    } catch (error: any) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).send({ error: "Token inválido" });
    }
}

// export const verifyToken2 = async (req: Request, res: Response, next: NextFunction) => {
//     let token = "";
//     token = req.header('token') + "";

//     console.log({token});

//     if (!token) {
//         return res.status(200).json({
//             error: 'Token de autorización invalido';
//         })
//     } else {
//         let config = {
//             method: "get",
//             maxBodyLength: Infinity,
//             headers: {
//                 token: token,
//             }
//         }
//     };
//     try {
//         const response = await axios.request(config);
//         let data = response.data;
//         console.log(data);

//         if (data.s)
//     } catch (error) {

//     }
// }