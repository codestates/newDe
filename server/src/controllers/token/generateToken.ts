import * as jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
import { User } from "../../entities/user"

dotenv.config()

export async function  generateToken(userInfo:User) {
    return jwt.sign(
        {
            userInfo
        },
        process.env.ACCESS_SECRET,
        { expiresIn: '2d' },
    ) 
}