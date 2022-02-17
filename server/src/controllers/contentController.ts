import { Request, Response } from "express";
import { createQueryBuilder, getRepository, getConnection } from "typeorm";
import { User } from "../entities/user";
import { Content } from "../entities/content"
import { authorizeToken } from './token/authorizeToken'

const recommentContent = async (req:Request, res:Response) => {
    const { contentId } = req.body;
    const verify = await authorizeToken(req, res)

    const ContentRepository = getRepository(Content)

    const contentInfo = await ContentRepository.findOne({
        where: { id : contentId }
    })

    await getConnection()
    .createQueryBuilder()
    .update(Content)
    .set({
        like: contentInfo.like + 1
    })
    .where({ id : contentId })
    .execute();

    res.status(200).json({ message: "succes" })
}
const reportContent = (req:Request, res:Response) => res.send("reportContent");
const allContent = (req:Request, res:Response) => {

};
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

    await ContentRepository.save(content);
    return res.status(201).json({ message: 'Succes'})
    
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