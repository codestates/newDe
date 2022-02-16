import { Request, Response } from "express";

const recommentContent = (req:Request, res:Response) => res.send("recommentContent");
const reportContent = (req:Request, res:Response) => res.send("reportContent");
const allContent = (req:Request, res:Response) => res.send("allContent");
const createContent = (req:Request, res:Response) => res.send("createContent");
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