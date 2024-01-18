import { AuthClient, AuthSession } from "../utils/auth";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import { useState } from "react";

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

    // if (profileQuery.isRefetching)
    //     return <p>Refetching data...</p>

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

            <h4>Bio</h4>
            <p>Optimistic bio: {profileQuery.data.bio}</p>
            {
                profileQuery.isRefetching ? <p>Refetching...</p> : <p>Actual bio: {profileQuery.data.bio}</p>
            }
            <BioSection bio={profileQuery.data.bio} />
        </div>

        <button onClick={() => signOutMutation.mutate()}>
            Sign Out
        </button>
    </div>);
}

interface BioSectionProps {
    bio: string | null
}

function BioSection(props: BioSectionProps) {

    const initialBioText: string = props.bio === null ? "" : props.bio;
    const [bioText, setBioText] = useState(initialBioText);

    // wrapper of query client
    const utils = trpc.useUtils();

    const setBioMutation = trpc.setBio.useMutation({
        onMutate: async (newBio) => {
            // Cancel outgoing refetches
            utils.getProfile.cancel();

            const previousProfile = utils.getProfile.getData();
            if (!previousProfile)
                return;

            // Optimistic update
            utils.getProfile.setData(undefined, {
                ...previousProfile,
                bio: newBio
            })

            return { currentProfile: previousProfile }
        },

        // Rollback if mutation fails
        onError: (_err, _newBio, context) => {
            utils.getProfile.setData(undefined, context?.currentProfile);
        },

        // Refetch after error or success
        onSettled: () => {
            // no need to pass query key! trpc automatically abstracts this away
            utils.getProfile.invalidate();
        }
    })

    if (setBioMutation.isPending)
        return <p>Updating bio...</p>

    return <>
        <textarea
            value={bioText}
            onChange={e => setBioText(e.target.value)}
        />

        <div>
            <button
                onClick={() => setBioMutation.mutateAsync(bioText)}
            >
                Update Bio
            </button>
        </div>
    </>
}
