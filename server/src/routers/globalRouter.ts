import express from 'express';
import { login, signup } from '../controllers/userController.js';

const globalRouter = express.Router()

globalRouter.post("/login", login);
globalRouter.post("/signup", signup);
// globalRouter.get("/report/board", reportBoard);
// globalRouter.get("/report/comment", reportComment);


export default globalRouter