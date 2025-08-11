import { supabase } from "@/lib/supabase"
import type { SystemLog } from "@/types/visitor"

export const supabaseLogsService = {
  // Get recent system logs
  getRecentLogs: async (limit = 10): Promise<SystemLog[]> => {
    try {
      const { data, error } = await supabase
        .from("system_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) {
        console.error("Error fetching system logs:", error)
        throw new Error(`Erro ao buscar logs: ${error.message}`)
      }

      return (data || []).map((log) => ({
        id: log.id,
        action: log.action,
        entityType: log.entity_type,
        entityId: log.entity_id || undefined,
        userId: log.user_id || undefined,
        details: log.details,
        ipAddress: log.ip_address || undefined,
        userAgent: log.user_agent || undefined,
        createdAt: log.created_at,
      }))
    } catch (error: any) {
      console.error("Error in getRecentLogs:", error)
      throw error
    }
  },

  // Get logs by action type
  getLogsByAction: async (action: string, limit = 20): Promise<SystemLog[]> => {
    try {
      const { data, error } = await supabase
        .from("system_logs")
        .select("*")
        .eq("action", action)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) {
        console.error("Error fetching logs by action:", error)
        throw new Error(`Erro ao buscar logs por ação: ${error.message}`)
      }

      return (data || []).map((log) => ({
        id: log.id,
        action: log.action,
        entityType: log.entity_type,
        entityId: log.entity_id || undefined,
        userId: log.user_id || undefined,
        details: log.details,
        ipAddress: log.ip_address || undefined,
        userAgent: log.user_agent || undefined,
        createdAt: log.created_at,
      }))
    } catch (error: any) {
      console.error("Error in getLogsByAction:", error)
      throw error
    }
  },

  // Get logs from today
  getTodayLogs: async (): Promise<SystemLog[]> => {
    try {
      const today = new Date().toISOString().split("T")[0]

      const { data, error } = await supabase
        .from("system_logs")
        .select("*")
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lte("created_at", `${today}T23:59:59.999Z`)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching today logs:", error)
        throw new Error(`Erro ao buscar logs de hoje: ${error.message}`)
      }

      return (data || []).map((log) => ({
        id: log.id,
        action: log.action,
        entityType: log.entity_type,
        entityId: log.entity_id || undefined,
        userId: log.user_id || undefined,
        details: log.details,
        ipAddress: log.ip_address || undefined,
        userAgent: log.user_agent || undefined,
        createdAt: log.created_at,
      }))
    } catch (error: any) {
      console.error("Error in getTodayLogs:", error)
      throw error
    }
  },
}
