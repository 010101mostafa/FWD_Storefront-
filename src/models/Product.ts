import {product} from "../types";
import pool from "../helper/database"

const index = async ():Promise<product[]>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql="SELECT * FROM Product ;";
    const res=await conn.query(sql);
    conn.release();
    return res.rows;
};
const show = async (id:number):Promise<product>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql=`SELECT * FROM Product WHERE id = ${id};`;
    const res=await conn.query(sql);
    conn.release();
    return res.rows[0];
};
const create = async (newProduct:product):Promise<void>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql=`INSERT INTO Product(name,price,category)
                VALUES(${newProduct.name},${newProduct.price},${newProduct.category});`;
    await conn.query(sql);
    conn.release();
};
const topFive = async ():Promise<product[]>=>{//don't forget put this fun between try and catch
    const conn = await pool.connect();
    const res = await conn.query(
        `SELECT * FROM Product 
            WHERE id in (
                SELECT poductId FROM OrdersProduct 
                GROUP BY poductId 
                ORDER BY count(*) 
                LIMIT  5 );`
        );
    conn.release();
    return res.rows;
};
const showCategory = async (category:string):Promise<product>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql=`SELECT * FROM Product WHERE category = ${category};`;
    const res=await conn.query(sql);
    conn.release();
    return res.rows[0];
};
export default {index,show,create,topFive,showCategory}