import express from 'express';
import { reportComment, allComment, createComment, editComment, deleteComment } from '../controllers/contentController.js';

const commentRouter = express.Router()

commentRouter.patch("/report", reportComment)
commentRouter
    .route("/")
    .get(allComment)
    .post(createComment)
commentRouter
    .route("/:commentid")
    .patch(editComment)
    .delete(deleteComment)


export default commentRouter