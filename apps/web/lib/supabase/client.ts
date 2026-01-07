import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "⚠️ Supabase environment variables are missing. " +
      "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. " +
      "See SUPABASE_SETUP.md for instructions."
    );
    // Return a mock client that won't crash but will inform users
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ 
          data: { user: null, session: null }, 
          error: { message: "Supabase not configured" } 
        }),
        signUp: async () => ({ 
          data: { user: null, session: null }, 
          error: { message: "Supabase not configured" } 
        }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ data: null, error: null }) }),
      }),
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

