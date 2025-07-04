import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from './database.types';
import 'dotenv/config';

export const kyselyProvider = {
  provide: 'Kysely',
  useFactory: () => {
    return new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/sevenwonders',
        }),
      }),
    });
  },
}; 