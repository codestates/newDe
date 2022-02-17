import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { json } from 'stream/consumers';

dotenv.config()

export async function authorizeToken(req:Request, res:Response) {
    const JWT = req.cookies.accessToken
    const data = jwt.verify(
        JWT,
        process.env.ACCESS_SECRET,
        (err: any, decoded: object) => {
            if(err) {
                return res.status(403).json({ message: 'Invalid Accesstoken' });
            } else {
                return decoded;
            }
        }
    )

    return data;
}