import { pool } from "../config/db.js";

export const getBalance = async (req, res) => {
  const { id } = req.user;
  const result = await pool.query(
    "SELECT balance FROM accounts WHERE user_id=$1",
    [id]
  );
  res.json(result.rows[0]);
};
