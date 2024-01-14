import type { Session } from "@supabase/supabase-js";

export class AuthSession {
    public email;
    public userId;

    private _supabaseSession;

    constructor(supabaseSession: Session) {
        this._supabaseSession = supabaseSession;

        this.userId = this._supabaseSession.user.id;
        this.email = this._supabaseSession.user.email;
    }
}
