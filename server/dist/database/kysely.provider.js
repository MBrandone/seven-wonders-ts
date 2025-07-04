"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kyselyProvider = void 0;
const kysely_1 = require("kysely");
const pg_1 = require("pg");
require("dotenv/config");
exports.kyselyProvider = {
    provide: 'Kysely',
    useFactory: () => {
        return new kysely_1.Kysely({
            dialect: new kysely_1.PostgresDialect({
                pool: new pg_1.Pool({
                    connectionString: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/sevenwonders',
                }),
            }),
        });
    },
};
//# sourceMappingURL=kysely.provider.js.map