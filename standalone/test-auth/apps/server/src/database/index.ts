import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../environment';

const postgresConnectionUrl = env.POSTGRES_DATABASE_URL;
if (!postgresConnectionUrl) {
    console.error("Postgres Connection URL undefined!");
}

const queryClient = postgres(postgresConnectionUrl as string);

export const db = drizzle(queryClient);