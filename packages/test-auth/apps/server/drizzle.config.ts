import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/database/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.POSTGRES_DATABASE_URL as string
    },
    verbose: true,
    strict: true,
} satisfies Config;