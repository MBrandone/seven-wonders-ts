import { Kysely } from 'kysely';
import { Database } from './database.types';
import 'dotenv/config';
export declare const kyselyProvider: {
    provide: string;
    useFactory: () => Kysely<Database>;
};
