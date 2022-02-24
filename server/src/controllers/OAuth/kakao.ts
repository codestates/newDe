import { Request, Response } from 'express';
import * as dotenv from 'dotenv'

dotenv.config()

const kakao = async (req:Request, res:Response) => {
    return res.redirect(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&&response_type=code`
    );
};

export {
    kakao
}