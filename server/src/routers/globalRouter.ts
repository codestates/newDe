import express from 'express';
import { login, signup } from '../controllers/userController.js';
import saveImage from '../controllers/imageController.js';
import upload from '../middleware/multer.js';
import { getReportedContent } from '../controllers/contentController.js';
import { getReportedComment } from '../controllers/commentController.js';
import { kakao } from '../controllers/OAuth/kakao.js';
import { kakaologin } from '../controllers/OAuth/kakakoCallback.js';

const globalRouter = express.Router();

globalRouter.post("/login", login);
globalRouter.post("/signup", signup);
globalRouter.post("/image", upload.single('img'), saveImage);
globalRouter.get("/kakao", kakao);
globalRouter.get("/kakaoCallback", kakaologin)
globalRouter.get("/report/board", getReportedContent);
globalRouter.get("/report/comment", getReportedComment);



export default globalRouter