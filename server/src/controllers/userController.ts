import { Request, Response } from "express";
import { createQueryBuilder, getRepository, getConnection, MetadataAlreadyExistsError } from "typeorm";
import { User } from "../entities/user";
import { Content } from "../entities/content";
import { generateToken } from '../middleware/token/generateToken';
import { authorizeToken } from '../middleware/token/authorizeToken';

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
            if(new Date(userInfo.penalty).getTime() - Date.now() > 0) return res.status(400).json({date:null, message: 'temporarily banned user'})
            const token = await generateToken(userInfo);
            console.log(token);
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
        const emailInfo = await userRepository.findOne({ email : email });
        const nicknameInfo = await userRepository.findOne({ nickname : nickname });

        if(emailInfo) {
            return res.status(409).json({ message: 'Account already exists' });
        }

        if (nicknameInfo) {
            return res.status(409).json({ message: 'nickname already exisits' })
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

        delete userInfo.password;
    
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
            return res.status(409).json({ message: 'nickname already exisits' })
        }
        return res.status(200).json({ message: 'nickname available'})
    } 

    return res.status(404).json({ message: 'Bad Request' })
};

const setUserPenalty = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res);
    if(!verify.userInfo.admin) return res.status(400).json({data: null, message: 'this request only allowed for administrator'});

    const { userId, penalty } = req.body;

    const userRepository = getRepository(User);

    const targetUser = await userRepository.findOne(userId);

    targetUser.penalty = new Date(Date.now() + (penalty*24*60*60*1000)).toString();

    await userRepository.save(targetUser);

    return res.status(200).json({data: null, message: 'ok'});
}

export {
    login,
    logout,
    signup,
    profile,
    editUser,
    deleteUser,
    checkInfo,
    setUserPenalty
};