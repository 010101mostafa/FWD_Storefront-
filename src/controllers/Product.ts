import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

import product from "./../models/Product";

dotenv.config();
const index = async (
        req: Request,res: Response,next: NextFunction
        ): Promise<void>=> 
{
    try{
        res.json(await product.index());
        res.status(200);
    }catch(err){
        res.json(err);
        res.status(500);
    }
};
const show = async (
    req: Request,res: Response,next: NextFunction):Promise<void>=> 
{
try{
    res.json(await product.show(req.params.id));
    res.status(200);
}catch(err){
    res.json(err);
    res.status(500);
}
};
const topFive = async (
    req: Request,res: Response,next: NextFunction):Promise<void>=> 
{
try{
    res.json(await product.topFive());
    res.status(200);
}catch(err){
    res.json(err);
    res.status(500);
}
};
const showCategory = async (
    req: Request,res: Response,next: NextFunction):Promise<void>=> 
{
try{
    res.json(await product.showCategory(req.params.category));
    res.status(200);
}catch(err){
    res.json(err);
    res.status(500);
}
};
const create =async ( req:Request,res:Response):Promise<void>=> 
{
    try{
        res.json(await product.create(req.body.product));
        res.status(200);
    }catch(err){
        res.json(err);
        res.status(500);
    }
};
export default {index,show,create,topFive,showCategory};
