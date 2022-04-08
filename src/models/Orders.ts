import pool from "../helpers/database"
import {order} from "../types"
const currentOrder = async (userId:number):Promise<order[]>=>{//don't forget put this fun between try and catch
    const conn=await pool.connect();
    const sql=`SELECT * FROM User 
        inner join Orders
            inner join OrdersProduct 
                inner join porduct
                on porduct.id = OrdersProduct.ProductId
            on OrdersProduct.OrdersId = Orders.id
        on Orders.userId = User.id
        WHERE user.id = ${userId};`;
    const res=await conn.query(sql);
    conn.release();
    return res.rows;
};
const completedOrders = async (userId:number):Promise<order[]>=>{//don't forget put this fun between try and catch
const conn=await pool.connect();
    const sql=`SELECT * FROM User 
        inner join Orders
            inner join OrdersProduct 
                inner join porduct
                on porduct.id = OrdersProduct.ProductId
            on OrdersProduct.OrdersId = Orders.id
        on Orders.userId = User.id
        WHERE user.id = ${userId}; and status='C'`;
    const res=await conn.query(sql);
    conn.release();
    return res.rows;
};
export default {currentOrder,completedOrders};