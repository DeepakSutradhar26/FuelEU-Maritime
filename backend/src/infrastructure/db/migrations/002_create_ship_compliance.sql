CREATE TABLE IF NOT EXISTS ship_compliance (
  id SERIAL PRIMARY KEY,
  ship_id VARCHAR(50),
  year INTEGER,
  cb_gco2eq DECIMAL(15,4),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(ship_id, year)
);