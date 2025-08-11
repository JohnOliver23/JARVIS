"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabaseRoomService } from "@/services/supabase-room-service"
import type { Room } from "@/types/visitor"
import { useToast } from "@/hooks/use-toast"

export const useSupabaseRoomsQuery = () => {
  return useQuery({
    queryKey: ["supabase-rooms"],
    queryFn: supabaseRoomService.getRooms,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // 15 seconds
  })
}

export const useSupabaseRoomQuery = (id: string) => {
  return useQuery({
    queryKey: ["supabase-rooms", id],
    queryFn: () => supabaseRoomService.getRoomById(id),
    enabled: !!id,
  })
}

export const useSupabaseCreateRoomMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: Omit<Room, "id" | "currentVisitors">) => supabaseRoomService.createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supabase-rooms"] })
      toast({
        title: "✅ Sucesso",
        description: "Sala criada com sucesso!",
        duration: 3000,
      })
    },
    onError: (error: any) => {
      console.error("Create room error:", error)
      toast({
        title: "❌ Erro",
        description: error.message || "Erro ao criar sala",
        variant: "destructive",
        duration: 5000,
      })
    },
  })
}

export const useSupabaseUpdateRoomMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Room> }) => supabaseRoomService.updateRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supabase-rooms"] })
      toast({
        title: "✅ Sucesso",
        description: "Sala atualizada com sucesso!",
        duration: 3000,
      })
    },
    onError: (error: any) => {
      console.error("Update room error:", error)
      toast({
        title: "❌ Erro",
        description: error.message || "Erro ao atualizar sala",
        variant: "destructive",
        duration: 5000,
      })
    },
  })
}

export const useSupabaseDeleteRoomMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => supabaseRoomService.deleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supabase-rooms"] })
      toast({
        title: "✅ Sucesso",
        description: "Sala removida com sucesso!",
        duration: 3000,
      })
    },
    onError: (error: any) => {
      console.error("Delete room error:", error)
      toast({
        title: "❌ Erro",
        description: error.message || "Erro ao remover sala",
        variant: "destructive",
        duration: 5000,
      })
    },
  })
}
