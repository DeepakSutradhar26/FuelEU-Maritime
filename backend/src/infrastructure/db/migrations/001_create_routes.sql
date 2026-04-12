CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  route_id VARCHAR(10) UNIQUE NOT NULL,
  vessel_type VARCHAR(50),
  fuel_type VARCHAR(50),
  year INTEGER,
  ghg_intensity DECIMAL(10,4),
  fuel_consumption DECIMAL(10,2),
  distance DECIMAL(10,2),
  total_emissions DECIMAL(10,2),
  is_baseline BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);