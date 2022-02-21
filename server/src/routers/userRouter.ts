import express from 'express';
import { profile, editUser, deleteUser, logout, checkInfo } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get("/logout", logout);
<<<<<<< HEAD
userRouter.post("/email", checkEmail);
userRouter.post("/password", checkPassword);
=======
userRouter.post("/check", checkInfo)
>>>>>>> 797c9a99d2da9afb1d591164b544a6fe7cff93c6
userRouter
    .route("/")
    .get(profile)
    .patch(editUser)
    .delete(deleteUser)

export default userRouter