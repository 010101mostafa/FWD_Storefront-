import { product } from "../types";
import pool from "../helpers/database";

const index = async (): Promise<product[]> => {
  //don't forget put this fun between try and catch
  const conn = await pool.connect();
  const sql = "SELECT * FROM Product ;";
  const res = await conn.query(sql);
  conn.release();
  return res.rows;
};
const show = async (id: number): Promise<product> => {
  //don't forget put this fun between try and catch
  const conn = await pool.connect();
  const sql = `SELECT * FROM Product WHERE id = ${id};`;
  const res = await conn.query(sql);
  conn.release();
  return res.rows[0];
};
const create = async (newProduct: product): Promise<void> => {
  //don't forget put this fun between try and catch
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
};
const topFive = async (): Promise<product[]> => {
  //don't forget put this fun between try and catch
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
};
const showCategory = async (category: string): Promise<product> => {
  //don't forget put this fun between try and catch
  const conn = await pool.connect();
  const sql = `SELECT * FROM Product WHERE category = ($1);`;
  const res = await conn.query(sql, [category]);
  conn.release();
  return res.rows[0];
};
export default { index, show, create, topFive, showCategory };
