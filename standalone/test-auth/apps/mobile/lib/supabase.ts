import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLIC_KEY as string;

if (!supabaseUrl)
    console.error("No EXPO_PUBLIC_SUPABASE_URL defined!")

if (!supabaseAnonKey)
    console.error("No EXPO_PUBLIC_SUPABASE_PUBLIC_KEY defined!")

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})