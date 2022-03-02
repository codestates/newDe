import { createQueryBuilder, getRepository, getConnection, Brackets } from "typeorm";
import { Request, Response } from 'express';
import { User } from '../../entities/user';
import * as dotenv from 'dotenv'
import * as jwt from "jsonwebtoken"
import axios from 'axios';
import { sign } from "crypto";
import { generateToken } from '../../middleware/token/generateToken'


dotenv.config()

const kakaologin = async (req:Request, res:Response) => {
    const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"
    const KAKAO_GRANT_TYPE="authorization_code"
    
    // 요청이 잘못된 경우, 다음 에러메시지를 반환한다.
    let code = req.query.code;
    if(!code) return res.status(400).json({ message: 'Bad Request!' });

    try {
         const result = await axios.post(
            `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_secret=${process.env.KAKAO_CLIENT_SECRET}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`
         );
         const token = result.data.access_token         

         const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
             headers: {
                Authorization: `Bearer ${token}` 
             }
         });


         let kakaoInfo = userInfo.data

         const user = new User();

         user.email = kakaoInfo.kakao_account.email
         user.nickname = ''
         user.password = ''
         user.kakao = true


         const userRepository = getRepository(User)
         const kakaoEmail = await userRepository.findOne({ email : kakaoInfo.kakao_account.email });
         
         //쿼리문 읽어서 모달창 띄우기
         
         if(kakaoEmail && !kakaoEmail.kakao) {              
              return res.status(409).redirect(`${process.env.CLIENT_URI}/login?islogin=fail`);
            }
         if(kakaoEmail && kakaoEmail.kakao) {            
            if(new Date(kakaoEmail.penalty).getTime() - Date.now() > 0) return res.status(400).redirect(`${process.env.CLIENT_URI}/callback?ban=${kakaoEmail.penalty}`);
            const accessToken = await generateToken(kakaoEmail) ;
            return res.status(201).cookie('accessToken', accessToken, {domain: 'newb-d.com', sameSite: 'none', secure: true}).redirect(`${process.env.CLIENT_URI}/callback?islogin=success`);
         }

         let count = 1
         let nickname = kakaoInfo.properties.nickname

         while(true) {
             const kakaoNickname = await userRepository.findOne({ nickname : nickname });

            if(kakaoNickname) {
                if(count === 1) nickname += count++;
                else nickname = nickname.slice(0, nickname.length-1) + count++;                
            } else {                
                break;
            }
         }

         user.nickname = nickname;

         const kakaoUser = await userRepository.save(user)
         const accessToken = await generateToken(kakaoUser)

         console.log(accessToken)

        return res
            .status(201)
            .cookie('accessToken', accessToken, {domain: 'newb-d.com', sameSite: 'none', secure: true})
            .redirect(`${process.env.CLIENT_URI}/callback?islogin=success`)
    }

    catch(e) {
        console.log(e)
        res.send(e)
    }
}

export {
    kakaologin
}