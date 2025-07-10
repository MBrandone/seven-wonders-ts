import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { Database } from "./database.types";
import "dotenv/config";

export const kyselyProvider = {
	provide: "Kysely",
	useFactory: () => {
		const isTest =
			process.env.NODE_ENV === "test" ||
			process.env.JEST_WORKER_ID !== undefined;
		const connectionString = isTest
			? process.env.DATABASE_URL_TEST
			: process.env.DATABASE_URL;
		return new Kysely<Database>({
			dialect: new PostgresDialect({
				pool: new Pool({
					connectionString,
				}),
			}),
		});
	},
};
