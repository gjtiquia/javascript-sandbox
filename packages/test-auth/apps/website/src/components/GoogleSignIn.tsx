import { AuthClient } from "../utils/auth";
import { useMutation } from "@tanstack/react-query";

export function GoogleSignIn(props: { authClient: AuthClient; }) {

    const signInMutation = useMutation({
        mutationFn: async () => {
            await props.authClient.signInWithGoogleAsync();
        }
    });

    if (signInMutation.isPending)
        return <p>Signing in...</p>;

    return <div>
        <h2>Google Sign In</h2>
        <button
            onClick={() => signInMutation.mutateAsync()}
        >
            Sign In With Google
        </button>
    </div>;
}
