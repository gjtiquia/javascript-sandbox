import { useState } from "react";
import { AuthClient } from "../utils/auth";

interface EmailSignInProps {
    authClient: AuthClient
}

export function EmailSignIn(props: EmailSignInProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signUpNewUserAsync() {
        setIsLoading(true);

        await props.authClient.signUpAsync({
            email: email,
            password: password
        });

        setIsLoading(false);
    }

    async function signInWithEmailAsync() {
        setIsLoading(true);

        await props.authClient.signInWithPasswordAsync({
            email: email,
            password: password,
        });

        setIsLoading(false);
    }

    if (isLoading)
        return <p>Loading...</p>;

    return <>
        <div>
            <span>Email: </span>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)} />
        </div>

        <div>
            <span>Password: </span>
            <input
                value={password}
                onChange={e => setPassword(e.target.value)} />
        </div>

        <button
            onClick={() => signUpNewUserAsync()}
        >
            Sign Up
        </button>

        <button
            onClick={() => signInWithEmailAsync()}
        >
            Sign In
        </button>
    </>;
}
