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
        const response = await this._supabase.auth.signOut();

        if (response.error) {
            throw new Error(response.error.message);
        }
    }

    public async signUpAsync(credentials: SignUpWithPasswordCredentials) {
        // Reference: https://supabase.com/docs/reference/javascript/auth-signup

        const response = await this._supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            options: {
                // Must be specified in redirect URLs in Supabase dashboard
                // emailRedirectTo: 'https://supabase.com/docs/guides/auth'
            }
        })

        // Note: A fake user object is returned from Supabase if an existing user already exists

        if (response.error) {
            throw new Error(response.error.message);
        }
    }

    public async signInWithPasswordAsync(credentials: SignInWithPasswordCredentials) {
        const response = await this._supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
        })

        if (response.error) {
            throw new Error(response.error.message);
        }
    }

    public async signInWithGoogleAsync() {
        const response = await this._supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // Must be specified in redirect URLs in Supabase dashboard
                redirectTo: import.meta.env.VITE_SITE_URL
            }
        })

        if (response.error) {
            throw new Error(response.error.message);
        }
    }
}
