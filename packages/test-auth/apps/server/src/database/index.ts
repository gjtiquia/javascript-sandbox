import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const postgresConnectionUrl = process.env.POSTGRES_DATABASE_URL;
if (!postgresConnectionUrl) {
    console.error("Postgres Connection URL undefined!");
}

const queryClient = postgres(postgresConnectionUrl as string);

export const db = drizzle(queryClient);