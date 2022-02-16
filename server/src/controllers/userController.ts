import { Request, Response } from "express";

const login = (req:Request, res:Response) => res.send("Login");
const logout = (req:Request, res:Response) => res.send("Log out");
const signup = (req:Request, res:Response) => res.send("sign up");
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