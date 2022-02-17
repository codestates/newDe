import express from 'express';
import { profile, editUser, deleteUser, logout, checkEmail, checkPassword } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get("/logout", logout);
userRouter.get("/email", checkEmail)
userRouter.post("/password", checkPassword);
userRouter
    .route("/")
    .get(profile)
    .patch(editUser)
    .delete(deleteUser)

export default userRouter