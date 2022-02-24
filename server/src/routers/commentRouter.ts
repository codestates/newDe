import express from 'express';
import { reportComment, createComment, editComment, allComment, deleteComment } from '../controllers/commentController';

const commentRouter = express.Router()

commentRouter.post("/", createComment)
commentRouter.patch("/", editComment)
commentRouter.patch("/report", reportComment)
commentRouter.get("/:contentId", allComment)
commentRouter.delete("/:commentId", deleteComment)


export default commentRouter