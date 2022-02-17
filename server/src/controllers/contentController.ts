import { Request, Response } from "express";
import { createQueryBuilder, getRepository, getConnection } from "typeorm";
import { User } from "../entities/user";
import { Content } from "../entities/content";
import { Comment } from "../entities/comment";
import { authorizeToken } from './token/authorizeToken';

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

    const verify = await authorizeToken(req, res);
    //console.log(verify);

    content.title = title;
    content.main = main;
    content.userId = verify.userInfo.id;
    content.parentCategory = parentCategory;
    content.childCategory = childCategory;
    
    const ContentRepository = getRepository(Content)
    

    await ContentRepository.save(content);
    return res.status(201).json({ message: 'Succes'})
    
};

const getContentDetail = (req:Request, res:Response) => res.send("getContentDetail");
const editContent = (req:Request, res:Response) => res.send("editContent");
const deleteContent = (req:Request, res:Response) => res.send("deleteContent");

// Comment
const reportComment = (req:Request, res:Response) => {    
    res.send("reportComment");
}
const allComment = async (req:Request, res:Response) => {     
    const contentId = req.params.contentId;

    const commentRepository = getRepository(Comment);
    
    const comments = await commentRepository.find({where : {contentId : contentId}});

    res.status(200).json({data: comments, message : 'ok'});
}
const createComment = async (req:Request, res:Response) => {
    const {contentId, userId, main} = req.body;

    const verify = await authorizeToken(req, res);

    const commentRepository = getRepository(Comment);

    const comment = new Comment();

    comment.contentId = contentId;
    comment.userId = userId;
    comment.main = main;

    await commentRepository.save(comment);

    res.status(201).json({data : comment, message:'comment registered successfully' });
}
const editComment = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res);
    console.log(verify);
    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' });

    const {commentId, userId, main} = req.body;

    const commentRepository = getRepository(Comment);

    const targetComment = await commentRepository.findOne(commentId);

    targetComment.main = main;

    await commentRepository.save(targetComment);

    res.status(200).json({data : targetComment, message : 'comment mdified successfully'});
}

const deleteComment = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res);
    const commentRepository = getRepository(Comment);

    const commentId = req.params.commentId;

    await commentRepository.delete( {id : Number(commentId) })

    return res
        .status(200)
        .json({ message: 'Deleted' })
};


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