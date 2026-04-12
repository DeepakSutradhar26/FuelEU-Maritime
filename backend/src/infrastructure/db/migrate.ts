import fs from 'fs';
import path from 'path';
import pool from './connection';

const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
    console.log(`Done: ${file}`);
  }

  await pool.end();
};

runMigrations().catch(console.error);