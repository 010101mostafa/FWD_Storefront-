import { product } from "../types";
import pool from "../helpers/database";

const index = async (): Promise<product[]> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    const sql = "SELECT * FROM Product ;";
    const res = await conn.query(sql);
    conn.release();
    return res.rows;
  } catch (e) {
    throw e;
  }
};
const show = async (id: number): Promise<product> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    const sql = `SELECT * FROM Product WHERE id = ($1);`;
    const res = await conn.query(sql, [id]);
    conn.release();
    return res.rows[0];
  } catch (e) {
    throw e;
  }
};
const create = async (newProduct: product): Promise<void> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    let res;
    if (newProduct.category == undefined) {
      res = await conn.query(
        `INSERT INTO Product(name,price)
                    VALUES(($1),($2)) returning id; `,
        [newProduct.name, newProduct.price]
      );
    } else {
      res = await conn.query(
        `INSERT INTO Product(name,price,category)
        VALUES(($1),($2),($3)) returning id;`,
        [newProduct.name, newProduct.price, newProduct.category]
      );
    }
    conn.release();
    return res.rows[0].id;
  } catch (e) {
    throw e;
  }
};
const topFive = async (): Promise<product[]> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    const res = await conn.query(
      `SELECT * FROM Product 
            WHERE id in (
                SELECT productId FROM OrdersProduct 
                GROUP BY productId 
                ORDER BY SUM(quantity) 
                LIMIT  5 );`
    );
    conn.release();
    return res.rows;
  } catch (e) {
    throw e;
  }
};
const showCategory = async (category: string): Promise<product> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    const sql = `SELECT * FROM Product WHERE category = ($1);`;
    const res = await conn.query(sql, [category]);
    conn.release();
    return res.rows[0];
  } catch (e) {
    throw e;
  }
};
export default { index, show, create, topFive, showCategory };
