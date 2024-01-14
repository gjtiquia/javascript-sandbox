import { useState } from "react";
import { AuthClient } from "../utils/auth";

interface MainPageProps {
    authClient: AuthClient
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
        <button onClick={() => signOutAsync()}>
            Sign Out
        </button>
    </div>);
}
