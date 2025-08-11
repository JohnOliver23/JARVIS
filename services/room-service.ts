import { api } from "@/lib/axios"
import type { Room } from "@/types/visitor"

export const roomService = {
  // Get all rooms
  getRooms: async (): Promise<Room[]> => {
    const response = await api.get("/rooms")
    return response.data
  },

  // Get room by ID
  getRoomById: async (id: string): Promise<Room> => {
    const response = await api.get(`/rooms/${id}`)
    return response.data
  },

  // Create new room
  createRoom: async (data: Omit<Room, "id" | "currentVisitors">): Promise<Room> => {
    const response = await api.post("/rooms", data)
    return response.data
  },

  // Update room
  updateRoom: async (id: string, data: Partial<Room>): Promise<Room> => {
    const response = await api.put(`/rooms/${id}`, data)
    return response.data
  },

  // Delete room
  deleteRoom: async (id: string): Promise<void> => {
    await api.delete(`/rooms/${id}`)
  },
}
