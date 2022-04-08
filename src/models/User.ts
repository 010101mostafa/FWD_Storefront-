import dotenv from "dotenv"
import bcrypt from "bcrypt"

import {user} from "./../types"
import pool from "../helpers/database"

dotenv.config();
const index = async ():Promise<user[]>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql="SELECT * FROM User ;";
    const res=await conn.query(sql);
    conn.release();
    return res.rows;
};
const show = async (id:number):Promise<user>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql=`SELECT * FROM User WHERE id = ${id};`;
    const res=await conn.query(sql);
    conn.release();
    return res.rows[0];
};
const create = async (newUser:user):Promise<void>=>{//don't forget put this fun between try and catch
    newUser.password=await bcrypt.hash(newUser.password+process.env.HASH_KEY,parseInt(process.env.HASH_SALT as string));
    const conn=await pool.connect();
    const sql=`INSERT INTO User(firstName,lastName,password)
                VALUES(${newUser.firstName},${newUser.lastName},${newUser.password});`;
    await conn.query(sql);
    conn.release();
};
export default {index,show,create}