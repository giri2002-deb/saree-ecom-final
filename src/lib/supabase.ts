import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client only if both URL and key are provided
export const supabase = supabaseUrl && supabaseAnonKey ? 
  createClient(supabaseUrl, supabaseAnonKey) : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl !== 'your-supabase-url' && 
           supabaseAnonKey !== 'your-supabase-anon-key');
};

// Database types
export interface SareeRecord {
  id: number;
  name: string;
  category: string;
  price: number;
  original_price: number;
  image: string | null;
  images: string[];
  description: string;
  features: string[];
  is_new: boolean;
  is_featured: boolean;
  rating: number;
  created_at: string;
  updated_at: string;
}