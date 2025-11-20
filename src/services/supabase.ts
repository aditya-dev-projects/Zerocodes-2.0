import { createClient } from '@supabase/supabase-js';

// Use import.meta.env for Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase Environment Variables. Authentication will not work.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);