import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabaseClient } from "./supabase";
import { AuthClient } from "./AuthClient";

export interface Auth {
    isInitializing: boolean
    isSignedIn: boolean
    client: AuthClient
}

export function useAuth(): Auth {
    const [isInitializing, setIsInitializing] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabaseClient.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setIsInitializing(false);
        });

        const { data } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            console.log("session", session);
        });

        return () => data.subscription.unsubscribe();
    }, []);

    const isSignedIn = session !== null;
    const authClient = new AuthClient(supabaseClient);

    return {
        isInitializing,
        isSignedIn,
        client: authClient
    };
}
