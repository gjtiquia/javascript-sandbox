import { useState } from "react";
import { AuthClient } from "../utils/auth";

export function GoogleSignIn(props: { authClient: AuthClient; }) {

    const [isLoading, setIsLoading] = useState(false);

    async function signInAsync() {
        setIsLoading(true);

        await props.authClient.signInWithGoogleAsync();

        // Commented because after successful sign-in, takes time for AuthState to change and re-render
        // Better to continue showing loading while waiting for AuthState to change
        // setIsLoading(false);
    }

    if (isLoading)
        return <p>Loading...</p>;

    return <div>
        <h2>Google Sign In</h2>
        <button
            onClick={() => signInAsync()}
        >
            Sign In With Google
        </button>
    </div>;
}
