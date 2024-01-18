import { eq } from "drizzle-orm"
import { db } from "../database"
import { profiles } from "../database/schema"

export async function setBioAsync(userId: string, bio: string) {

    await db.update(profiles)
        .set({ bio: bio + "!" })
        .where(eq(profiles.user_id, userId))

    console.log(`POST /setBio => ID: ${userId}, bio:`, bio)
}