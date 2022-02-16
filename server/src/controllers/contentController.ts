import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/user";
import { Content } from "../entities/content"
import { generateToken } from './token/generateToken'
import { authorizeToken } from './token/authorizeToken'

const recommentContent = (req:Request, res:Response) => res.send("recommentContent");
const reportContent = (req:Request, res:Response) => res.send("reportContent");
const allContent = (req:Request, res:Response) => res.send("allContent");
const createContent = async (req:Request, res:Response) => {
    const { title, main, userId, parentCategory, childCategory } = req.body
    const content = new Content()

    content.title = title;
    content.main = main;
    content.userId = userId;
    content.parentCategory = parentCategory;
    content.childCategory = childCategory;
    
    const ContentRepository = getRepository(Content)
    const verify = await authorizeToken(req, res)

    if(verify) {
        await ContentRepository.save(content);
        return res.status(201).json({ message: 'Succes'})
    }
    
};
const getContentDetail = (req:Request, res:Response) => res.send("getContentDetail");
const editContent = (req:Request, res:Response) => res.send("editContent");
const deleteContent = (req:Request, res:Response) => res.send("deleteContent");
const reportComment = (req:Request, res:Response) => res.send("reportComment");
const allComment = (req:Request, res:Response) => res.send("allComment");
const createComment = (req:Request, res:Response) => res.send("createComment");
const editComment = (req:Request, res:Response) => res.send("editComment");
const deleteComment = (req:Request, res:Response) => res.send("deleteComment");

export {
    recommentContent,
    reportContent,
    allComment,
    allContent,
    createComment,
    createContent,
    getContentDetail,
    editContent,
    deleteComment,
    deleteContent,
    reportComment,
    editComment
}