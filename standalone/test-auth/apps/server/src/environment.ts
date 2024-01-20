import "dotenv/config" // import from .env before anything else!

export const env = {
    SITE_URL: (() => {
        if (!process.env.SITE_URL)
            throw new Error("SITE_URL undefined!");

        return process.env.SITE_URL;
    })(),

    PORT: (() => {
        if (!process.env.PORT)
            throw new Error("PORT undefined!");

        return process.env.PORT;
    })(),

    AUTH_JWT_SECRET: (() => {
        if (!process.env.AUTH_JWT_SECRET)
            throw new Error("AUTH_JWT_SECRET undefined!");

        return process.env.AUTH_JWT_SECRET;
    })(),

    POSTGRES_DATABASE_URL: (() => {
        if (!process.env.POSTGRES_DATABASE_URL)
            throw new Error("POSTGRES_DATABASE_URL undefined!");

        return process.env.POSTGRES_DATABASE_URL;
    })(),
}