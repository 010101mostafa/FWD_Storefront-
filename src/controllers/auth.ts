import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

import _user from "./../models/User";

dotenv.config();

const auth =async (req:Request,res:Response,next: NextFunction):Promise<void>=> 
{
    let Jwt:jwt.JwtPayload;    
    try {
        const token = req.headers.authorization
                .split(' ')[1];
        Jwt=jwt.verify(token, process.env.TOKEN_SECRET as string) as jwt.JwtPayload;
        req.userId=Jwt.uid;
        next();
    } catch {
        res.status(401)
        res.json('not authotized')
        return;
    }
};
export default auth;