import express from 'express';
import { recommentContent, reportContent, allContent, createContent, getContentDetail, editContent, deleteContent } from '../controllers/contentController.js';

const boardRouter = express.Router()

boardRouter.patch("/recommend", recommentContent);
boardRouter.patch("/report", reportContent);
boardRouter
    .route("/")
    .get(allContent)
    .post(createContent)
boardRouter
    .route("/:contentid")
    .get(getContentDetail)
    .patch(editContent)
    .delete(deleteContent)


export default boardRouter