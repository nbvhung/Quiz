// config/db.js
import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "quiz",   
  password: "s30082005", 
  database: "quiz_app"
});
