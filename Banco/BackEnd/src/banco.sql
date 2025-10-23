CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  balance NUMERIC(12,2) DEFAULT 0
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  account_id INT REFERENCES accounts(id),
  type VARCHAR(20), -- 'PIX', 'DEPOSIT', 'WITHDRAW'
  amount NUMERIC(12,2),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
