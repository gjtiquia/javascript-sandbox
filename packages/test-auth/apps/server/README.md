# Test Auth - Server

An express server for querying databases.

## Commands

`npm run db:push`: Push schema to remote database directly with Drizzle without migration files
`npm run db:pull`: Pull schema from remote database and generate schema.ts in `./drizzle`
`npm run db:migration:generate`: Generates migration files with Drizzle
`npm run db:migration:run`: Runs the migrations with Drizzle
`npm run db:migration:drop`: Delete previously generated migrations from migrations folder

## References

- <https://orm.drizzle.team/kit-docs/overview>
