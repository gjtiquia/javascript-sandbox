import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import GoogleSigninButtonWrapper from '@/components/GoogleSignInButtonWrapper';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { SignedInView } from '../../components/SignedInView';
import { setAccessToken } from '@/lib/accessToken';

export default function TabOneScreen() {

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setAccessToken(session?.access_token);
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <GoogleSigninButtonWrapper />
      <Text style={styles.title}>Supabase Signed In: {session == null ? "False" : "True"}</Text>
      <SignedInView session={session} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


