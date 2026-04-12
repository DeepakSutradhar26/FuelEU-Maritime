CREATE TABLE IF NOT EXISTS pools (
  id SERIAL PRIMARY KEY,
  year INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pool_members (
  id SERIAL PRIMARY KEY,
  pool_id INTEGER REFERENCES pools(id),
  ship_id VARCHAR(50),
  cb_before DECIMAL(15,4),
  cb_after DECIMAL(15,4)
);