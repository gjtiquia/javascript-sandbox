import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabaseClient } from "./supabase";
import { AuthClient } from "./AuthClient";
import { AuthSession } from "./AuthSession";

// A workaround to store the access token instead of storing them in state. Because execution order is unknown, setting it here is safer.
let accessToken: string | undefined = undefined;
export const getAccessToken = () => accessToken;

export function useAuth() {
    const [isInitializing, setIsInitializing] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabaseClient.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setIsInitializing(false);
        });

        // https://supabase.com/docs/reference/javascript/auth-onauthstatechange
        // Auto-refreshes access tokens
        const { data } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            accessToken = session?.access_token;
        });

        return () => data.subscription.unsubscribe();
    }, []);

    return {
        isInitializing,
        isSignedIn: session !== null,
        client: new AuthClient(supabaseClient),
        session: session === null ? undefined : new AuthSession(session)
    };
}
