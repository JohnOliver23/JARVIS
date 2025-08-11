"use client"

import { useSystemLogsQuery } from "@/hooks/use-system-logs-query"

export function useActivityLogs(limit = 8) {
  const { data: logs = [], isLoading, error, refetch } = useSystemLogsQuery(limit)

  const hasLogs = logs.length > 0

  const refreshLogs = async () => {
    try {
      await refetch()
    } catch (error) {
      console.error("Error refreshing activity logs:", error)
    }
  }

  return {
    // Data
    logs,
    hasLogs,

    // States
    isLoading,
    error,

    // Actions
    refreshLogs,
  }
}
