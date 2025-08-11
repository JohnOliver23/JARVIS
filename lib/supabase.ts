import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Configuração usando variáveis de ambiente
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://tkquajsknflqncjchzjh.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcXVhanNrbmZscW5jamNoempoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NDY5NzQsImV4cCI6MjA3MDMyMjk3NH0.L1m84XhOrP4ZfUcflWHVwANHz0ABUPnBoApxz3USo7A";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your configuration."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Server-side client for API routes
export const createServerClient = () => {
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcXVhanNrbmZscW5jamNoempoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDc0Njk3NCwiZXhwIjoyMDcwMzIyOTc0fQ.eVw9RF8lUwnaa-iL0pRoRDvZlG6EpXQCLt_lzOzxIkg";

  if (!serviceRoleKey) {
    throw new Error("Missing Supabase Service Role Key");
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .select("count")
      .limit(1);
    if (error) throw error;
    return {
      success: true,
      message: "Conexão com Supabase estabelecida com sucesso!",
    };
  } catch (error: any) {
    return { success: false, message: `Erro na conexão: ${error.message}` };
  }
};
