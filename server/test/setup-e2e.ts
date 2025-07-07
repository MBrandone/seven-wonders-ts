import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL_TEST });

beforeEach(async () => {
    // Désactive les contraintes de clé étrangère, truncate, puis réactive
  await pool.query('BEGIN');
  await pool.query('TRUNCATE TABLE game_players, players, games RESTART IDENTITY CASCADE');
  await pool.query('COMMIT');
});

afterAll(async () => {
  await pool.end();
}); 