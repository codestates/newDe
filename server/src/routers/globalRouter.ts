import express from 'express';
import { login, signup } from '../controllers/userController.js';
import saveImage from '../controllers/imageController.js';
import upload from '../middleware/multer.js';

const globalRouter = express.Router();

globalRouter.post("/login", login);
globalRouter.post("/signup", signup);
globalRouter.post("/image", upload.single('img'), saveImage);
// globalRouter.get("/report/board", reportBoard);
// globalRouter.get("/report/comment", reportComment);


export default globalRouter