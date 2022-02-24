import { Request, Response } from 'express';
import { User } from '../../entities/user';
import * as dotenv from 'dotenv'
import axios from 'axios';

dotenv.config()

const kakaologin = async (req:Request, res:Response) => {
    const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"
    const KAKAO_GRANT_TYPE="authorization_code"
    
    let code = req.query.code;

    try {
         const result = await axios.post(
            `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_secret=${process.env.KAKAO_CLIENT_SECRET}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`
         );

         const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
             headers: {
                Authorization: `Bearer ${result.data.access_token}` 
             }
         });

         const token = result.data.access_token
         
         res.status(200).cookie('accessToken', token).redirect('http://localhost:3000')
    }

    catch(e) {
        console.log(e)
        res.send(e)
    }
}

export {
    kakaologin
}