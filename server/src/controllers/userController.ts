import { Request, Response } from "express";
import { createQueryBuilder, getRepository, getConnection } from "typeorm";
import { User } from "../entities/user";
import { Content } from "../entities/content";
import { generateToken } from './token/generateToken';
import { authorizeToken } from './token/authorizeToken';

const login = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user = new User();

    user.email = email;
    user.password = password;

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
    const { email, nickName, password } = req.body;
    const user = new User();

    user.email = email;
    user.nickName = nickName;
    user.password = password;

    const userRepository = getRepository(User)

    if(!email || !nickName || !password) {
        return res.status(400).json({ message: 'Bad Request' });
    } else {
        const userInfo = await userRepository.findOne({ email : email });

        if(userInfo) {
            return res.status(409).json({ message: 'Account already exists' });
        }
        await userRepository.save(user);
        return res.status(201).json({ message: 'Succes'})
    }
}

const profile = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res)
    
    const ContentRepository = getRepository(Content)
    const userRepository = getRepository(User)

    console.log(verify)

    
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
    const { nickName, password } = req.body;
    const verify = await authorizeToken(req, res)
    const userRepository = getRepository(User)

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })
    
    const userInfo = await userRepository.findOne({
        where: { id : verify.userInfo.id }
    })
    
    userInfo.nickName = nickName || userInfo.nickName;
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

    await userRepository.delete({ id: verify.userInfo.id })

    return res
        .clearCookie('accessToken')
        .status(200)
        .json({ message: 'Deleted' })
};
const checkEmail = async (req:Request, res:Response) => {
    const { email } = req.body;
    const userRepository = getRepository(User);

    if(!email) {
        return res.status(400).json({ message: 'Bad Request' });
    } else {
        const userInfo = await userRepository.findOne({ email : email });

        if (userInfo) {
            return res.status(409).json({ message: 'Account already exisits' })
        }

        return res.status(200).json({ message: 'email available'})
    }
};
const checkPassword = async (req:Request, res:Response) => {
    const { password } = req.body;
    const verify = await authorizeToken(req, res);

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })

    console.log(verify.userInfo)

    if(!password) {
        return res.status(400).json({ message: 'Bad Request'})
    }

    if(verify.userInfo.password !== password) {
        return res.status(400).json({ message: 'incorrect password' });
    } else {
        return res.status(200).json({ message: 'password correct!' })
    }
};

export {
    login,
    logout,
    signup,
    profile,
    editUser,
    deleteUser,
    checkEmail,
    checkPassword
};