import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { user } from "./../types";
import pool from "../helpers/database";
type verifiedUser = {
  id: number;
  token: string;
};

dotenv.config();
const index = async (): Promise<user[]> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    const sql = "SELECT * FROM _user ;";
    const res = await conn.query(sql);
    conn.release();
    return res.rows;
  } catch (e) {
    throw e;
  }
};
const show = async (id: number): Promise<user> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    const conn = await pool.connect();
    const sql = `SELECT * FROM _user WHERE id = ${id};`;
    const res = await conn.query(sql);
    conn.release();
    return res.rows[0];
  } catch (e) {
    throw e;
  }
};
const create = async (newUser: user): Promise<verifiedUser> => {
  //I don't need to put it within a try statement  but you ask me to do that
  try {
    newUser.password = await bcrypt.hash(
      newUser.password + process.env.HASH_KEY,
      parseInt(process.env.HASH_SALT as string)
    );
    const conn = await pool.connect();
    const sql = `INSERT INTO _user(firstName,lastName,password)
                VALUES(($1),($2),($3)) returning id;`;
    newUser.id = (
      await conn.query(sql, [
        newUser.firstname,
        newUser.lastname,
        newUser.password,
      ])
    ).rows[0];
    conn.release();
    return {
      token: jwt.sign({ uid: newUser.id }, process.env.TOKEN_SECRET as string),
      id: newUser.id,
    };
  } catch (e) {
    throw e;
  }
};

const login = async (
  userId: number,
  password: string
): Promise<verifiedUser> => {
  try {
    const conn = await pool.connect();
    const res = await conn.query(`SELECT * FROM _user WHERE _user.id = ($1);`, [
      userId,
    ]);
    conn.release();
    if (res.rows.length == 0) throw "the user doesn't exist";
    //return {token:res.rows[0].password+"  t  "+(await bcrypt.hash(password+process.env.HASH_KEY,parseInt(process.env.HASH_SALT as string)))+"  :  "+await bcrypt.compare(password+process.env.HASH_KEY, (await bcrypt.hash(password+process.env.HASH_KEY,parseInt(process.env.HASH_SALT as string)))) ,id:res.rows[0].id};
    const matched = await bcrypt.compare(
      password + process.env.HASH_KEY,
      res.rows[0].password
    );
    if (matched)
      return {
        token: jwt.sign({ uid: userId }, process.env.TOKEN_SECRET as string),
        id: userId,
      };
    else throw "the password doesn't match";
  } catch (e) {
    throw e;
  }
};

export default { index, show, create, login };
