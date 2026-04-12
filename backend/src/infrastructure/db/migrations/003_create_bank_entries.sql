CREATE TABLE IF NOT EXISTS bank_entries (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(50),
  year INTEGER,
  amount_gco2eq DECIMAL(15,4),
  created_at TIMESTAMP DEFAULT NOW()
);