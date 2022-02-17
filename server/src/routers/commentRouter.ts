import express from 'express';
import { reportComment, allComment, createComment, editComment, deleteComment } from '../controllers/contentController.js';

const commentRouter = express.Router()

commentRouter.post("/", createComment)
commentRouter.patch("/", editComment)
commentRouter.patch("/report", reportComment)
commentRouter.get("/:contentId", allComment)
commentRouter
    .route("/:commentId")    
    .delete(deleteComment)


export default commentRouter