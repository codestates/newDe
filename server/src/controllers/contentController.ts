import { Request, Response } from "express";
import { createQueryBuilder, getRepository, getConnection, getMongoRepository } from "typeorm";
import { User } from "../entities/user";
import { Content } from "../entities/content";
import { Comment } from "../entities/comment";
import { authorizeToken } from '../middleware/token/authorizeToken';

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
const allContent = (req:Request, res:Response) => res.send("allContent");

const createContent = async (req:Request, res:Response) => {
    const { title, main, parentCategory, childCategory } = req.body
    const content = new Content()

    const verify = await authorizeToken(req, res);
    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' });
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

const editContent = async (req:Request, res:Response) => {
    const { title, main, parentCategory, childCategory } = req.body;
    const verify = await authorizeToken(req, res);
    const ContentRepository = getRepository(Content); 
    const targetContent = await ContentRepository.findOne({ id: Number(req.params.contentid) });

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })
    if(!targetContent) return res.status(400).json({ message: 'Bad Content' });
    if(!title || !main || !parentCategory || !childCategory) return res.status(400).json({ message: 'Bad Request' });
    if(targetContent.userId !== verify.userInfo.id ) return res.status(400).json({ message: 'different user' })

    targetContent.title = title;
    targetContent.main = main;
    targetContent.parentCategory = parentCategory;
    targetContent.childCategory = childCategory;

    await getConnection()
        .createQueryBuilder()
        .update(Content)
        .set(targetContent)      
        .where({ id: targetContent.id })
        .execute();

        console.log(targetContent)

    return res.status(200).json({ message: "edit success" })
};

const deleteContent = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res);
    const ContentRepository = getRepository(Content); 
    const targetContent = await ContentRepository.findOne({ id: Number(req.params.contentid) });

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })
    if(targetContent.userId !== verify.userInfo.id ) return res.status(400).json({ message: 'different user' })

    await ContentRepository.delete(req.params.contentid)

    return res.status(200).json({ message: 'Deleted' })
};

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
    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' });

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
    const commentRepository = getRepository(Comment);
    const {commentId, userId, main} = req.body;

    const targetComment = await commentRepository.findOne(commentId);

    //console.log(verify);
    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' });
    if(targetComment.userId !== verify.userInfo.id) return res.status(400).json({ message: 'different user'});

    targetComment.main = main;

    await commentRepository.save(targetComment);

    res.status(200).json({ data : targetComment, message : 'comment mdified successfully' });
}

const deleteComment = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res);    
    const commentRepository = getRepository(Comment);
    const commentId = req.params.commentId;  

    const targetContent = await commentRepository.findOne(commentId)    

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' });
    if(targetContent.userId !== verify.userInfo.id) return res.status(400).json({ message: 'different user' })

    await commentRepository.delete( commentId )

    return res.status(200).json({ message: 'Deleted' })
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