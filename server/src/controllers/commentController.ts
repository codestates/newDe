import { Request, Response } from "express";
import { createQueryBuilder, getRepository, getConnection, MoreThanOrEqual } from "typeorm";
import { Comment } from "../entities/comment";
import { authorizeToken } from '../middleware/token/authorizeToken';


const allComment = async (req:Request, res:Response) => {     
    const contentId = req.params.contentId;

    const commentRepository = getRepository(Comment);
    
    //const comments = await commentRepository.find({where : {contentId : contentId}});

    const comments = await commentRepository
        .createQueryBuilder('comment')
        .select(['comment', 'comments.nickname'])
        .leftJoin('comment.user', 'comments')
        .where('comment.contentId = :contentId', {contentId})
        .getMany();

    res.status(200).json({data: comments, message : 'ok'});
}

const createComment = async (req:Request, res:Response) => {
    const {contentId, main} = req.body;

    const verify = await authorizeToken(req, res);
    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' });

    const commentRepository = getRepository(Comment);

    const comment = new Comment();

    comment.contentId = contentId;
    comment.userId = verify.userInfo.id;
    comment.main = main;

    await commentRepository.save(comment);

    res.status(201).json({data : comment, message:'comment registered successfully' });
}

const editComment = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res);
    const commentRepository = getRepository(Comment);
    const {commentId, main} = req.body;

    const targetComment = await commentRepository.findOne(commentId);

    //console.log(verify);
    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' });
    if(targetComment.userId !== verify.userInfo.id) return res.status(400).json({ message: 'different user'});

    targetComment.main = main;

    console.log(main)
    
    await commentRepository.save(targetComment);
    console.log(targetComment)

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

const reportComment = async (req:Request, res:Response) => {    
    const { commentId } = req.body;
    const verify = await authorizeToken(req, res)

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })

    const commentRepository = getRepository(Comment);

    const commentInfo = await commentRepository.findOne({
        where: { id : commentId }
    })

    await getConnection()
    .createQueryBuilder()
    .update(Comment)
    .set({
        report: commentInfo.report + 1
    })
    .where({ id : commentId })
    .execute();

    console.log(commentInfo)
    console.log(commentInfo.report)

    res.status(200).json({ message: "success" })
}

const getReportedComment = async (req:Request, res:Response) => {
    const CommentRepository = getRepository(Comment)

    const comments = await CommentRepository.find({
        report: MoreThanOrEqual(5)
    })

    res.status(200).json({ data: comments, message: "ok" })
}

export {
    allComment,
    createComment,
    editComment,
    deleteComment,
    reportComment,
    getReportedComment
}