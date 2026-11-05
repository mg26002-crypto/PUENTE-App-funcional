import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Estas variables son opcionales: MockAPI sigue funcionando aunque Supabase no esté configurado.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigurado = Boolean(supabaseUrl && supabasePublishableKey);

// AsyncStorage conserva la sesión entre aperturas; solo se crea el cliente con ambas variables.
export const supabase = supabaseConfigurado
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
