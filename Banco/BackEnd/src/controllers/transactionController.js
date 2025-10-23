import { pool } from "../config/db.js";

export const createTransaction = async (req, res) => {
  const { id } = req.user;
  const { amount, type, description } = req.body;

  const acc = await pool.query("SELECT id, balance FROM accounts WHERE user_id=$1", [id]);
  const account = acc.rows[0];

  if (type === "WITHDRAW" && account.balance < amount) {
    return res.status(400).json({ message: "Saldo insuficiente" });
  }

  let newBalance =
    type === "DEPOSIT" ? account.balance + amount : account.balance - amount;

  await pool.query("UPDATE accounts SET balance=$1 WHERE id=$2", [newBalance, account.id]);
  await pool.query(
    "INSERT INTO transactions (account_id, type, amount, description) VALUES ($1, $2, $3, $4)",
    [account.id, type, amount, description]
  );

  res.json({ message: "Transação realizada com sucesso!" });
};
