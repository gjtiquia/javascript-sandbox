import { EmailSignIn } from "./EmailSignIn";
import { GoogleSignIn } from "./GoogleSignIn";
import { AuthClient } from "../utils/auth";

export function SignInPage(props: { authClient: AuthClient; }) {
    return <>
        <EmailSignIn authClient={props.authClient} />
        <GoogleSignIn authClient={props.authClient} />
    </>;
}
