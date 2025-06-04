import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oaxbcgytpckgpwdyrjbx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const redirectTo = import.meta.env.MODE === 'production' 
  ? 'https://serene-starburst-c1aeca.netlify.app/auth/callback'
  : 'http://localhost:5175/auth/callback';

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    flowType: 'pkce',
    global: {
      headers: {
        'x-application-name': 'zaavg',
      },
    },
    redirectTo,
  }
});