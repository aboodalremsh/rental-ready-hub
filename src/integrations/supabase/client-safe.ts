// Safe Supabase client wrapper for environments where build-time env vars may be missing (e.g., GitHub Pages).
// Uses publishable defaults and prefers VITE_* env values when available.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const FALLBACK_SUPABASE_URL = "https://utxkmxcmzewuxtmxqixd.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eGtteGNtemV3dXh0bXhxaXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NzE1NjcsImV4cCI6MjA4MjE0NzU2N30.pZuKO_tKdZEodKyUIlyvP0r-wXFsHa8JI9uCN3mb_pA";

const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const envKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const SUPABASE_URL = envUrl && envUrl.length > 0 ? envUrl : FALLBACK_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  envKey && envKey.length > 0 ? envKey : FALLBACK_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
