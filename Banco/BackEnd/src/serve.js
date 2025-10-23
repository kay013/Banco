import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, login } from "./controllers/authController.js";
import { getBalance } from "./controllers/accountController.js";
import { createTransaction } from "./controllers/transactionController.js";
import { requireAuth } from "./middleware/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/account/balance", requireAuth, getBalance);
app.post("/transactions", requireAuth, createTransaction);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
