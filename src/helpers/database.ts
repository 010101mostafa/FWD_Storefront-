import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const {NODE_ENV, DB_NAME, DB_HOST, DB_USER, DB_PASSWORD,TEST_DB_NAME } = process.env;
let database:string|undefined="";
if(NODE_ENV=='dev')
  database=DB_NAME;
else if (NODE_ENV=='dev')
  database=TEST_DB_NAME; 
const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: database,
});

export default pool;
