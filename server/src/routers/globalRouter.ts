import express from 'express';
import { login, signup, oauth } from '../controllers/userController.js';
import saveImage from '../controllers/imageController.js';
import upload from '../middleware/multer.js';
import { getReportedComment, getReportedContent } from '../controllers/contentController.js';

const globalRouter = express.Router();

globalRouter.post("/login", login);
globalRouter.post("/oauth", oauth)
globalRouter.post("/signup", signup);
globalRouter.post("/image", upload.single('img'), saveImage);
globalRouter.get("/report/board", getReportedContent);
globalRouter.get("/report/comment", getReportedComment);


export default globalRouter