import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
    [name, email, hashed]
  );
  await pool.query("INSERT INTO accounts (user_id, balance) VALUES ($1, $2)", [user.rows[0].id, 0]);
  res.json({ message: "Usuário criado com sucesso!" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (user.rows.length === 0) return res.status(401).json({ message: "Usuário não encontrado" });
  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(401).json({ message: "Senha incorreta" });
  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};
