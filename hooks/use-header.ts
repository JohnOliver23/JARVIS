"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function useHeader() {
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await queryClient.invalidateQueries()
    } catch (error) {
      console.error("Error refreshing queries:", error)
    } finally {
      // Delay para mostrar o feedback visual do loading
      setTimeout(() => setIsRefreshing(false), 1000)
    }
  }

  const handleNotifications = () => {
    // Lógica futura para notificações
    console.log("Notifications clicked")
  }

  return {
    // Estado
    isRefreshing,

    // Handlers
    handleRefresh,
    handleNotifications,
  }
}
