import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Informe as credenciais PUBLICÁVEIS do seu próprio projeto em .env.local.
// Sem essas variáveis, as páginas públicas podem abrir, mas não haverá backend funcional.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "missing-public-anon-key";

export const SUPABASE_URL = supabaseUrl;
export const SUPABASE_PUBLISHABLE_KEY = supabaseAnonKey;
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: { storage: localStorage, persistSession: true, autoRefreshToken: true },
});
