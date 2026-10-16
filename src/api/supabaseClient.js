import { createClient } from '@supabase/supabase-js';

// Supabase client stub — fill with your values and/or set via env vars in deployment
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Example usage:
// const { data, error } = await supabase.from('posts').select('*');
