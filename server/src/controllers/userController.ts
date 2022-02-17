import { Request, Response } from "express";
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