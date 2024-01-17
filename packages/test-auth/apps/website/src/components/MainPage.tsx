import { AuthClient, AuthSession } from "../utils/auth";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";

interface MainPageProps {
    authClient: AuthClient,
    authSession: AuthSession
}

export function MainPage(props: MainPageProps) {

    const profileQuery = trpc.getProfile.useQuery()

    const signOutMutation = useMutation({
        mutationFn: async () => await props.authClient.signOutAsync()
    })

    if (signOutMutation.isPending)
        return <p>Signing out...</p>;

    if (profileQuery.isPending)
        return <p>Fetching data...</p>

    if (profileQuery.isError)
        return <div>
            <p>Error: {profileQuery.error.message}</p>
            <button onClick={() => profileQuery.refetch()}>
                Retry
            </button>
            <button onClick={() => signOutMutation.mutate()}>
                Sign Out
            </button>
        </div>

    return (<div>
        <p>Signed In!</p>
        <p>Email: {props.authSession.email}</p>
        <p>User ID: {props.authSession.userId}</p>

        <div>
            <span>API URL: </span>
            <span>{import.meta.env.VITE_API_URL}</span>
        </div>

        <div>
            <h3>Profile</h3>
            <p>ID: {profileQuery.data.id}</p>
            <p>User ID: {profileQuery.data.user_id}</p>
            <p>Bio: {profileQuery.data.bio}</p>
        </div>

        <button onClick={() => signOutMutation.mutate()}>
            Sign Out
        </button>
    </div>);
}
