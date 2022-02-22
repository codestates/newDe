import express from 'express';
import { profile, editUser, deleteUser, logout, checkInfo } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get("/logout", logout);
userRouter.post("/check", checkInfo)
userRouter
    .route("/")
    .get(profile)
    .patch(editUser)
    .delete(deleteUser)

    

export default userRouter