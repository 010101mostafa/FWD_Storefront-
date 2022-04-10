import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

import _user from "./../models/User";

dotenv.config();
const index = async (
        req: Request,res: Response):Promise<void>=> {
    try{
        res.json(await _user.index());
        res.status(200);
    }catch(err){
        res.json(err);
        res.status(500);
    }
};
const show = async (req: Request,res: Response):Promise<void>=> {
    try{
        res.json(await product.show(req.userId));
        res.status(200);
    }catch(err){
        res.json(err);
        res.status(500);
    }
};
const create =async (
    req:Request,res:Response,next: NextFunction):Promise<void>=> 
{
    try{
        res.json(await _user.create(req.body.User));
        res.status(200);
    }catch(err){
        res.json(err);
        res.status(500);
    }
};
const login =async (
    req:Request,res:Response,next: NextFunction):Promise<void>=> 
{
    try{
        res.json(await _user.login(req.body.username,req.body.password));
        res.status(200);
    }catch(err){
        res.json(err);
        res.status(500);
    }
};
export default {index,show,create,login};
