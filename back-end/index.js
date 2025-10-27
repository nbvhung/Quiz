import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // sửa nếu bạn có password MySQL
  database: "quiz_app"
});

const SECRET = "nbv-quiz-secret"; // có thể đổi tùy ý

// Đăng ký
app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const [exists] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (exists.length > 0) {
    return res.json({ success: false, message: "Email đã tồn tại" });
  }

  const hashed = await bcrypt.hash(password, 10);
  await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashed]);

  return res.json({ success: true, message: "Tạo tài khoản thành công" });
});

// Đăng nhập
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) {
    return res.json({ success: false, message: "Email không tồn tại" });
  }

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({ success: false, message: "Sai mật khẩu" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "7d" });

  return res.json({ success: true, token, user });
});

app.listen(3002, () => console.log("✅ Backend đang chạy tại http://localhost:3002"));
