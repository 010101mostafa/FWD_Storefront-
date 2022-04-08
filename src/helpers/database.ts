import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { DB_NAME, DB_HOST,DB_USER ,DB_PASSWORD } = process.env;
const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

export default pool;