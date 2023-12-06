import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface Payload {
    id: string;
    email: string;
}

export const generateToken = (payload: Payload): string => {
    const secretKey: string = process.env.JWT_SECRET || 'SECRET';

    return jwt.sign(payload, secretKey, { expiresIn: '8h' });
}

export const verifyToken = (token: string): Payload | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as Payload;
    } catch (error) {
        return null;
    }
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "No hay token" });
    }

    const token = req.headers.authorization.split(' ').pop() as string;

    if (!token) {
        return res.status(400).send({ error: "Token no encontrado" });
    }

    const tokenData = await verifyToken(token);

    if (tokenData && tokenData.id) {
        next();
    } else {
        return res.status(401).send({ error: "Token inválido" });
    }
};

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