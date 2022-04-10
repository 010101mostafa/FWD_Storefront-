import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

import orders from "./../models/Orders";

dotenv.config();
const currentOrder = async (
        req: Request,res: Response,next: NextFunction
        ): Promise<void>=> 
{
    let Jwt:jwt.JwtPayload;    
    try {
        const token = req.headers.authorization
                .split(' ')[1];
        Jwt=jwt.verify(token, process.env.TOKEN_SECRET as string) as jwt.JwtPayload;
    } catch {
        res.status(401)
        res.json('not authotized')
        return;
    }
    try{
        res.json(await orders.currentOrder(Jwt.uid));
        res.status(200);
    }catch(err){
        res.json(err);
        res.status(500);
    }
    
};
const completedOrders =async (
    req:Request,res:Response,next: NextFunction
    ): Promise<void>=> 
{
let Jwt:jwt.JwtPayload;    
try {
    const token = req.headers.authorization
            .split(' ')[1];
    Jwt=jwt.verify(token, process.env.TOKEN_SECRET as string) as jwt.JwtPayload;
} catch {
    res.status(401)
    res.json('not authotized')
    return;
}
try{
    res.json(await orders.completedOrders(Jwt["uid"]));
    res.status(200);
}catch(err){
    res.json(err);
    res.status(500);
}

};
export default {currentOrder,completedOrders};
