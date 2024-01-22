import { Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { supabase } from '@/lib/supabase';
import { trpc } from '@/lib/trpc';
import { Session } from '@supabase/supabase-js';

export function SignedInView(props: { session: Session | null; }) {

    const session = props.session;
    const profileQuery = trpc.getProfile.useQuery()

    if (session == null)
        return null;

    return <View>
        <Text>User ID: {session.user.id}</Text>

        {profileQuery.isPending && <Text>Pending...</Text>}
        {profileQuery.isRefetching && <Text>Refetching...</Text>}
        {profileQuery.isSuccess && <Text>{JSON.stringify(profileQuery.data)}</Text>}
        {profileQuery.isError && <Text>Error: {profileQuery.error.message}</Text>}

        <Button
            title='Refetch'
            onPress={async () => {
                await profileQuery.refetch();
            }} />

        <Button
            title='Sign Out Supabase Auth'
            onPress={async () => {
                await supabase.auth.signOut();
            }} />
    </View>;
}
