import { useState } from "react";
import { AuthClient, AuthSession } from "../utils/auth";

interface MainPageProps {
    authClient: AuthClient,
    authSession: AuthSession
}

export function MainPage(props: MainPageProps) {

    const [isLoading, setIsLoading] = useState(false);

    async function signOutAsync() {
        setIsLoading(true);
        await props.authClient.signOutAsync();
        setIsLoading(false);
    }

    if (isLoading)
        return <p>Loading...</p>;

    return (<div>
        <p>Signed In!</p>
        <p>Email: {props.authSession.email}</p>
        <p>User ID: {props.authSession.userId}</p>
        <button onClick={() => signOutAsync()}>
            Sign Out
        </button>
    </div>);
}
