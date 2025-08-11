"use client"

import { useQuery } from "@tanstack/react-query"
import { supabaseLogsService } from "@/services/supabase-logs-service"

export const useSystemLogsQuery = (limit = 10) => {
  return useQuery({
    queryKey: ["system-logs", limit],
    queryFn: () => supabaseLogsService.getRecentLogs(limit),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // 15 seconds
  })
}

export const useLogsByActionQuery = (action: string, limit = 20) => {
  return useQuery({
    queryKey: ["system-logs", "action", action, limit],
    queryFn: () => supabaseLogsService.getLogsByAction(action, limit),
    enabled: !!action,
    staleTime: 30000, // 30 seconds
  })
}

export const useTodayLogsQuery = () => {
  return useQuery({
    queryKey: ["system-logs", "today"],
    queryFn: supabaseLogsService.getTodayLogs,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // 30 seconds
  })
}
