import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!email || !password) {
      return res.json({
        code: 400,
        success: false,
        message: "Thiếu email hoặc mật khẩu!"
      });
    }

    const [exists] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (exists.length > 0) {
      return res.json({
        code: 200,
        success: false,
        message: "Email đã tồn tại!"
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)", [fullName, email, hashed]);

    return res.json({
      code: 200,
      success: true,
      message: "Đăng ký thành công!"
    });

  } catch (error) {
    console.error(error);
    return res.json({
      code: 500,
      success: false,
      message: "Server error!"
    });
  }
};
