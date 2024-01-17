import { SignInPage } from "../components/SignInPage";
import { MainPage } from "../components/MainPage";
import { AuthClient, AuthSession } from "../utils/auth";

interface AppContentsProps {
    isAuthInitializing: boolean,
    isAuthSignedIn: boolean,
    authClient: AuthClient,
    authSession?: AuthSession
}

export function AppContents(props: AppContentsProps) {

    if (props.isAuthInitializing)
        return <p>Auth Initializing...</p>;

    return (
        <>
            <h1>Test Auth</h1>

            {props.isAuthSignedIn ?
                <MainPage authClient={props.authClient} authSession={props.authSession!} />
                :
                <SignInPage authClient={props.authClient} />}
        </>
    );
}
