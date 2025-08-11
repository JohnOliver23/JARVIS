"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { visitorService } from "@/services/visitor-service"
import type { CreateVisitorData, UpdateVisitorData } from "@/types/visitor"
import { useToast } from "@/hooks/use-toast"

export const useVisitorsQuery = () => {
  return useQuery({
    queryKey: ["visitors"],
    queryFn: visitorService.getVisitors,
  })
}

export const useActiveVisitorsQuery = () => {
  return useQuery({
    queryKey: ["visitors", "active"],
    queryFn: visitorService.getActiveVisitors,
  })
}

export const useVisitorQuery = (id: string) => {
  return useQuery({
    queryKey: ["visitors", id],
    queryFn: () => visitorService.getVisitorById(id),
    enabled: !!id,
  })
}

export const useVisitorStatsQuery = () => {
  return useQuery({
    queryKey: ["visitors", "stats"],
    queryFn: visitorService.getStats,
  })
}

export const useCreateVisitorMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: CreateVisitorData) => visitorService.createVisitor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] })
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      toast({
        title: "Sucesso",
        description: "Visitante cadastrado com sucesso!",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao cadastrar visitante",
        variant: "destructive",
      })
    },
  })
}

export const useUpdateVisitorMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVisitorData }) => visitorService.updateVisitor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] })
      toast({
        title: "Sucesso",
        description: "Visitante atualizado com sucesso!",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao atualizar visitante",
        variant: "destructive",
      })
    },
  })
}

export const useRegisterExitMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => visitorService.registerExit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] })
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      toast({
        title: "Sucesso",
        description: "Saída registrada com sucesso!",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao registrar saída",
        variant: "destructive",
      })
    },
  })
}

export const useDeleteVisitorMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => visitorService.deleteVisitor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] })
      toast({
        title: "Sucesso",
        description: "Visitante removido com sucesso!",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao remover visitante",
        variant: "destructive",
      })
    },
  })
}
