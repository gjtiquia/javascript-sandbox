import { eq } from "drizzle-orm";
import { db } from "../database";
import { profiles, users } from "../database/schema";

export async function getProfileAsync(userId: string) {

    console.log("GET /profile => userId:", userId);

    const existingUsers = await db.select().from(users)
        .where(eq(users.id, userId));

    if (existingUsers.length === 0) {
        console.log(`User ${userId} does not exist! Creating new user...`)
        await createNewUserAsync(userId);
    }

    const existingProfiles = await db.select().from(profiles)
        .where(eq(profiles.user_id, userId));

    if (existingProfiles.length === 0) {
        console.log(`User ${userId} does not have a profile! Creating one...`)

        const newProfiles = await createNewProfileAsync(userId);
        return newProfiles[0];
    }

    return existingProfiles[0]
}

async function createNewUserAsync(userId: string) {
    await db.insert(users).values({ id: userId })
}

async function createNewProfileAsync(userId: string) {
    const profile = await db.insert(profiles).values({ user_id: userId }).returning()
    return profile;
}
