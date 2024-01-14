import type { SupabaseClient } from "@supabase/supabase-js";

interface SignUpWithPasswordCredentials {
    email: string,
    password: string
}

interface SignInWithPasswordCredentials {
    email: string,
    password: string
}

export class AuthClient {
    private _supabase;

    constructor(supabaseClient: SupabaseClient) {
        this._supabase = supabaseClient;
    }

    public async signOutAsync() {
        return await this._supabase.auth.signOut();
    }

    public async signUpAsync(credentials: SignUpWithPasswordCredentials) {
        return await this._supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            options: {
                emailRedirectTo: 'https://supabase.com/docs/guides/auth'
            }
        })
    }

    public async signInWithPasswordAsync(credentials: SignInWithPasswordCredentials) {
        return await this._supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
        })
    }
}
