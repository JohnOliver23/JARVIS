"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabaseVisitorService } from "@/services/supabase-visitor-service"
import type { CreateVisitorData } from "@/types/visitor"
import { useToast } from "@/hooks/use-toast"

export const useSupabaseVisitorsQuery = () => {
  return useQuery({
    queryKey: ["supabase-visitors"],
    queryFn: supabaseVisitorService.getVisitors,
    staleTime: 30000, // 30 seconds
  })
}

export const useSupabaseActiveVisitorsQuery = () => {
  return useQuery({
    queryKey: ["supabase-visitors", "active"],
    queryFn: supabaseVisitorService.getActiveVisitors,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // 15 seconds
  })
}

export const useSupabaseVisitorQuery = (id: string) => {
  return useQuery({
    queryKey: ["supabase-visitors", id],
    queryFn: () => supabaseVisitorService.getVisitorById(id),
    enabled: !!id,
  })
}

export const useSupabaseVisitorStatsQuery = () => {
  return useQuery({
    queryKey: ["supabase-visitors", "stats"],
    queryFn: supabaseVisitorService.getStats,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // 30 seconds
  })
}

export const useSupabaseVisitorHistoryQuery = () => {
  return useQuery({
    queryKey: ["supabase-visitors", "history"],
    queryFn: supabaseVisitorService.getVisitorHistory,
    staleTime: 60000, // 1 minute
  })
}

export const useSupabaseCreateVisitorMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: CreateVisitorData) => supabaseVisitorService.createVisitor(data),
    onSuccess: () => {
      // Invalidate all visitor-related queries
      queryClient.invalidateQueries({ queryKey: ["supabase-visitors"] })
      queryClient.invalidateQueries({ queryKey: ["supabase-rooms"] })
      toast({
        title: "✅ Sucesso",
        description: "Visitante cadastrado com sucesso!",
        duration: 3000,
      })
    },
    onError: (error: any) => {
      console.error("Create visitor error:", error)
      toast({
        title: "❌ Erro",
        description: error.message || "Erro ao cadastrar visitante",
        variant: "destructive",
        duration: 5000,
      })
    },
  })
}

export const useSupabaseRegisterExitMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => supabaseVisitorService.registerExit(id),
    onSuccess: () => {
      // Invalidate all visitor-related queries
      queryClient.invalidateQueries({ queryKey: ["supabase-visitors"] })
      queryClient.invalidateQueries({ queryKey: ["supabase-rooms"] })
      toast({
        title: "✅ Sucesso",
        description: "Saída registrada com sucesso!",
        duration: 3000,
      })
    },
    onError: (error: any) => {
      console.error("Register exit error:", error)
      toast({
        title: "❌ Erro",
        description: error.message || "Erro ao registrar saída",
        variant: "destructive",
        duration: 5000,
      })
    },
  })
}

export const useSupabaseDeleteVisitorMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => supabaseVisitorService.deleteVisitor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supabase-visitors"] })
      toast({
        title: "✅ Sucesso",
        description: "Visitante removido com sucesso!",
        duration: 3000,
      })
    },
    onError: (error: any) => {
      console.error("Delete visitor error:", error)
      toast({
        title: "❌ Erro",
        description: error.message || "Erro ao remover visitante",
        variant: "destructive",
        duration: 5000,
      })
    },
  })
}
