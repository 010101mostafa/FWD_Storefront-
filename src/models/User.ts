import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import {user} from "./../types"
import pool from "../helpers/database"

dotenv.config();
const index = async ():Promise<user[]>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql="SELECT * FROM _user ;";
    const res=await conn.query(sql);
    conn.release();
    return res.rows;
};
const show = async (id:number):Promise<user>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql=`SELECT * FROM _user WHERE id = ${id};`;
    const res=await conn.query(sql);
    conn.release();
    return res.rows[0];
};
const create = async (newUser:user):Promise<string>=>{//don't forget put this fun between try and catch
    newUser.password=await bcrypt.hash(newUser.password+process.env.HASH_KEY,parseInt(process.env.HASH_SALT as string));
    const conn=await pool.connect();
    const sql=`INSERT INTO _user(firstName,lastName,password)
                VALUES(${newUser.firstName},${newUser.lastName},${newUser.password});`;
    await conn.query(sql);
    conn.release();
    return jwt.sign({uid:newUser.id},process.env.TOKEN_SECRET as string);
};

const login = async ( userId:number,password:string):Promise<string> => 
{    
    const conn=await pool.connect();
    const res=await conn.query(`SELECT * FROM _user WHERE _user.id = ${userId};`);
    conn.release();
    if (res.rows.length==0)
        throw Error("the user doesn't exist");
    const matched=await bcrypt.compare(password+process.env.HASH_KEY, res.rows[0].password);
    if (matched)
        return jwt.sign({uid:userId},process.env.TOKEN_SECRET as string);
    else
        throw Error("the password doesn't match");
}

export default {index,show,create,login}