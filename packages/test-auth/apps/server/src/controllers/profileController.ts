import { eq } from "drizzle-orm";
import { db } from "../database";
import { profiles, users } from "../database/schema";
import { CommonRequest, CommonResponse } from "../types";

export async function profileControllerAsync(req: CommonRequest, res: CommonResponse) {
    const userId = res.locals.userId as string;

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

        const profile = await createNewProfileAsync(userId);
        return res.json(profile);
    }

    const profile = existingProfiles[0];
    return res.json(profile)
}

async function createNewUserAsync(userId: string) {
    await db.insert(users).values({ id: userId })
}

async function createNewProfileAsync(userId: string) {
    const profile = await db.insert(profiles).values({ user_id: userId }).returning()
    return profile;
}
