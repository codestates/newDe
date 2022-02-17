import { Request, Response } from "express";
<<<<<<< HEAD
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/user";

const login = (req:Request, res:Response) => res.send("Login");
const logout = (req:Request, res:Response) => res.send("Log out");

const signup = async (req:Request, res:Response) => {
    const { email, password, nickName } = req.body;
    
    const user = new User();
    user.email = email;
    user.password = password;
    user.nickName = nickName;

    const userRepository = getRepository(User);

    const check = await userRepository.find({ email:email });
    if(check) {
        await userRepository.save(user);
        res.status(201).send('sign up');
    }
    else {
        res.status(400).send("conflict");
    }    
}

const profile = (req:Request, res:Response) => {
    console.log(req.params.id)
    res.send(`profile ${req.params.id}`)
=======
import { getRepository } from "typeorm";
import { User } from "../entities/user";
import { Content } from "../entities/content"
import { generateToken } from './token/generateToken'
import { authorizeToken } from './token/authorizeToken'

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
    
    console.log(verify.userInfo)

    const userInfo = await userRepository.findOne({
        where: { id : verify.userInfo.id }
    })


    const userContent = await ContentRepository.find({
        where: { userId : userInfo.id }
    })

    return res.status(201).json({ data: {...userInfo, content: userContent} })
>>>>>>> 37b837b0ce1f1304abfc7d18fc4b2c0d4c8646dd
}

const editUser = (req:Request, res:Response) => res.send("Edit User");
const deleteUser = (req:Request, res:Response) => res.send("Delete");
const checkEmail = (req:Request, res:Response) => res.send("checkEmail");
const checkPassword = (req:Request, res:Response) => res.send("checkPassword");

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