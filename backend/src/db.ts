import mysql, { Pool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const checkPoolConnection = (pool: Pool) => {
  pool.getConnection((err) => {
    if (err) throw err;

    console.log("connected to mysql database");
  });
};
//singleton implementation
class DbPool {
  private static instance: DbPool;
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  static getInstance(): DbPool {
    if (!DbPool.instance) {
      DbPool.instance = new DbPool();
    }

    return DbPool.instance;
  }

  getPool(): Pool {
    return this.pool;
  }
}

export default DbPool.getInstance().getPool();
