import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const postgresConnectionUrl = process.env.POSTGRES_DATABASE_URL as string;

const queryClient = postgres(postgresConnectionUrl);

export const db = drizzle(queryClient);