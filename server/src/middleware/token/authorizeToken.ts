import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config()

export async function authorizeToken(req:Request, res:Response) {
    const JWT = req.cookies.accessToken
    const data = jwt.verify(
        JWT,
        process.env.ACCESS_SECRET,
        (err: any, decoded: object) => {
            if(err) {
                return null;
            } else {
                return decoded;
            }
        }
    )

    return data;
}