import { Request, Response } from 'express';
import axios from 'axios';

const authrorizeKakaoToken = async (req:Request, res:Response) => {
    const kakaoAccessToken = req.cookies.kakaoAccessToken
    const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
             headers: {
                Authorization: `Bearer ${kakaoAccessToken}` 
             }
         });

    if(!userInfo.data.kakao_account) return null;
    else return userInfo.data.kakao_accout;
}

export default authrorizeKakaoToken;