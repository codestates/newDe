import { Request, Response } from "express";
import { createQueryBuilder, getRepository, getConnection, MetadataAlreadyExistsError } from "typeorm";
import { User } from "../entities/user";
import { Content } from "../entities/content";
import { generateToken } from '../middleware/token/generateToken';
import { authorizeToken } from '../middleware/token/authorizeToken';
import axios from 'axios';

const oauth = async (req:Request, res:Response) => {
    const clientID = process.env.KAKAO_CLIENT_ID;
    const clientSecret = process.env.KAKAO_CLIENT_SECRET
    const authorizationCode = req.body.authorizationCode;

    if(!authorizationCode) {
        res.status(404).json({data : null, message : 'not authorized'});
    }

    const kakaoResponse = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_secret=${clientSecret}&client_id=${clientID}&redirect_uri=http://localhost:3000/callback&code=${authorizationCode}`
    );

    console.log(kakaoResponse)
    

    res.send('ouath');
}

const login = async (req:Request, res:Response) => {
    const { email, password } = req.body;

    const userRepository = getRepository(User)

    if(!email || !password) {
        return res.status(400).json({ message: 'Fail' })
    } else {
        const userInfo = await userRepository.findOne({
            email : email,
            password : password,
        });

        if(userInfo) {
            const token = await generateToken(userInfo);
            // console.log(token);
            res.cookie('accessToken', token);
            res.status(200).json({ data : userInfo, message: 'Login Success'})
        } else {
            res.status(404).send('invalid user');
        }
    }
}

const logout = async (req:Request, res:Response) => {
    return res.clearCookie('accessToken').status(205).json({ message: 'Logout Success' })
}

const signup = async (req:Request, res:Response) => {
    const { email, nickname, password } = req.body;
    const user = new User();

    user.email = email;
    user.nickname = nickname;
    user.password = password;

    const userRepository = getRepository(User)

    if(!email || !nickname || !password) {
        return res.status(400).json({ message: 'Bad Request' });
    } else {
        const userInfo = await userRepository.findOne({ email : email });

        if(userInfo) {
            return res.status(409).json({ message: 'Account already exists' });
        }
        await userRepository.save(user);
        return res.status(201).json({ message: 'Success'})
    }
}

const profile = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res)
    
    const ContentRepository = getRepository(Content)
    const userRepository = getRepository(User)

    

    
    if(verify) {
        const userInfo = await userRepository.findOne({
            where: { id : verify.userInfo.id }
        })
    
    
        const userContent = await ContentRepository.find({
            where: { userId : userInfo.id }
        })
    
        return res.status(201).json({ data: {...userInfo, content: userContent} })
    } else {
        return res.status(400).json({ message: 'Invalid Accesstoken' })
    }
}

const editUser = async (req:Request, res:Response) => {
    const { nickname, password } = req.body;
    const verify = await authorizeToken(req, res)
    const userRepository = getRepository(User)

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })

    const userInfo = await userRepository.findOne({
        where: { id : verify.userInfo.id }
    })

    userInfo.nickname = nickname || userInfo.nickname;
    userInfo.password = password || userInfo.password;

    await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(userInfo)
        .where({ id : verify.userInfo.id })
        .execute();
        

    return res.status(200).json({ data: userInfo })
};

const deleteUser = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res);
    const userRepository = getRepository(User);

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })

    const targetUser = await userRepository.findOne(verify.userInfo.id);

    targetUser.nickname = '';
    targetUser.email = '';
    targetUser.password = '';

    await userRepository.save(targetUser);
    
    return res
        .clearCookie('accessToken')
        .status(200)
        .json({ message: 'Deleted' })
};

const checkInfo = async (req:Request, res:Response) => {
    const { email, nickname, password } = req.body;
    console.log(email, nickname, password);
    const userRepository = getRepository(User);
    
    if(email) {
        const userInfo = await userRepository.findOne({ email : email });
        if (userInfo) {
            return res.status(409).json({ message: 'Account already exisits' })
        }
        return res.status(200).json({ message: 'email available'})
    } 
    
    if(password) {
        const verify = await authorizeToken(req, res);
        if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })
        const userRepository = getRepository(User);

        const userInfo = await userRepository.findOne({ email : verify.userInfo.email });
        
        if(userInfo.password === password) {
            return res.status(200).json({ message: 'password correct!' });
        } else {
            return res.status(400).json({ message: 'incorrect password' })
        }
    } 
    
    if(nickname) {
        const userInfo = await userRepository.findOne({ nickname : nickname });
        if (userInfo) {
            return res.status(200).json({ message: 'nickname already exisits' })
        }
        return res.status(200).json({ message: 'nickname available'})
    } 

    return res.status(404).json({ message: 'Bad Request' })
};


export {
    oauth,
    login,
    logout,
    signup,
    profile,
    editUser,
    deleteUser,
    checkInfo
};