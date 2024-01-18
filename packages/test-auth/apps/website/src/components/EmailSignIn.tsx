import { useState } from "react";
import { AuthClient } from "../utils/auth";
import { useMutation } from "@tanstack/react-query";

interface EmailSignInProps {
    authClient: AuthClient
}

export function EmailSignIn(props: EmailSignInProps) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpMutation = useMutation({
        mutationFn: async () => {
            signInMutation.reset();

            await props.authClient.signUpAsync({
                email: email,
                password: password
            });
        }
    })

    const signInMutation = useMutation({
        mutationFn: async () => {
            signUpMutation.reset();

            await props.authClient.signInWithPasswordAsync({
                email: email,
                password: password,
            });
        }
    })

    if (signInMutation.isPending)
        return <p>Signing in...</p>;

    if (signUpMutation.isPending)
        return <p>Signing up...</p>

    if (signUpMutation.isSuccess)
        return <p>Signed up! Please check your email.</p>

    return <>
        <h2>Email Sign In</h2>

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

        {signInMutation.isError && <p>{signInMutation.error.message}</p>}
        {signUpMutation.isError && <p>{signUpMutation.error.message}</p>}

        <button
            onClick={() => signUpMutation.mutateAsync()}
        >
            Sign Up
        </button>

        <button
            onClick={() => signInMutation.mutateAsync()}
        >
            Sign In
        </button>
    </>;
}
