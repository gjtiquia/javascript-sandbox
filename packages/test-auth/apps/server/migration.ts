import "dotenv/config";
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function runMigrationAsync() {
    const postgresConnectionUrl = process.env.POSTGRES_DATABASE_URL as string;

    const migrationClient = postgres(postgresConnectionUrl, { max: 1 });

    const db = drizzle(migrationClient);

    await migrate(db, { migrationsFolder: "./drizzle" });

    // Don't forget to close the connection, otherwise the script will hang
    await migrationClient.end();
}

runMigrationAsync();