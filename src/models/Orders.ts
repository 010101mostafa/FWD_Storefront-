import pool from "../helpers/database";
import { order } from "../types";
const currentOrder = async (userId: number): Promise<order[]> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    const sql = `SELECT * FROM _user 
        inner join Orders
            inner join OrdersProduct 
                inner join product
                on product.id = OrdersProduct.ProductId
            on OrdersProduct.OrdersId = Orders.id
        on Orders.userId = _user.id
        WHERE _user.id = ($1);`;
    const res = await conn.query(sql, [userId]);
    conn.release();
    return res.rows;
  } catch (e) {
    throw e;
  }
};
const completedOrders = async (userId: number): Promise<order[]> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    const sql = `SELECT * FROM _user 
        inner join Orders
            inner join OrdersProduct 
                inner join product
                on product.id = OrdersProduct.ProductId
            on OrdersProduct.OrdersId = Orders.id
        on Orders.userId = _user.id
        WHERE _user.id = ($1) and status='C';`;
    const res = await conn.query(sql, [userId]);
    conn.release();
    return res.rows;
  } catch (e) {
    throw e;
  }
};

export default { currentOrder, completedOrders };
