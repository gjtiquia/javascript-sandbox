/*
The schema files SHOULD NOT contain any runtime logic besides defining your DB schema. 
In particular, your DB connection should be defined separately. 
Otherwise, that logic will be executed whenever you run any drizzle-kit commands.

Schema-related type definitions, on the other hand, are allowed and even encouraged, as they are not executed at runtime.

Reference: https://orm.drizzle.team/docs/migrations
*/

import { uuid, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid("id")
        .primaryKey()
});