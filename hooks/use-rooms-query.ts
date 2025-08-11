"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { roomService } from "@/services/room-service"
import type { Room } from "@/types/visitor"
import { useToast } from "@/hooks/use-toast"

export const useRoomsQuery = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: roomService.getRooms,
  })
}

export const useRoomQuery = (id: string) => {
  return useQuery({
    queryKey: ["rooms", id],
    queryFn: () => roomService.getRoomById(id),
    enabled: !!id,
  })
}

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: Omit<Room, "id" | "currentVisitors">) => roomService.createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      toast({
        title: "Sucesso",
        description: "Sala criada com sucesso!",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao criar sala",
        variant: "destructive",
      })
    },
  })
}

export const useUpdateRoomMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Room> }) => roomService.updateRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      toast({
        title: "Sucesso",
        description: "Sala atualizada com sucesso!",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao atualizar sala",
        variant: "destructive",
      })
    },
  })
}

export const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => roomService.deleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      toast({
        title: "Sucesso",
        description: "Sala removida com sucesso!",
      })
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao remover sala",
        variant: "destructive",
      })
    },
  })
}
