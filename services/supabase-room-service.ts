import { supabase } from "@/lib/supabase"
import type { Room } from "@/types/visitor"

export const supabaseRoomService = {
  // Get all rooms with current occupancy
  getRooms: async (): Promise<Room[]> => {
    try {
      // Try to use the view first
      const { data: viewData, error: viewError } = await supabase.from("room_occupancy").select("*").order("name")

      if (!viewError && viewData) {
        return viewData.map((room) => ({
          id: room.id,
          name: room.name,
          maxCapacity: room.max_capacity,
          currentVisitors: room.current_visitors,
        }))
      }

      // Fallback to manual query if view doesn't exist
      console.warn("View room_occupancy not found, using fallback queries")

      const { data: rooms, error: roomsError } = await supabase
        .from("rooms")
        .select("*")
        .eq("is_active", true)
        .order("name")

      if (roomsError) {
        console.error("Error fetching rooms:", roomsError)
        throw new Error(`Erro ao buscar salas: ${roomsError.message}`)
      }

      // Get visitor counts for each room
      const roomsWithCounts = await Promise.all(
        (rooms || []).map(async (room) => {
          const { data: visitors, error: visitorsError } = await supabase
            .from("visitors")
            .select("id")
            .eq("destination_room", room.name)
            .eq("is_active", true)

          if (visitorsError) {
            console.error("Error counting visitors:", visitorsError)
          }

          return {
            id: room.id,
            name: room.name,
            maxCapacity: room.max_capacity,
            currentVisitors: visitors?.length || 0,
          }
        }),
      )

      return roomsWithCounts
    } catch (error: any) {
      console.error("Error in getRooms:", error)
      throw error
    }
  },

  // Get room by ID
  getRoomById: async (id: string): Promise<Room> => {
    try {
      const { data, error } = await supabase.from("rooms").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching room:", error)
        throw new Error(`Erro ao buscar sala: ${error.message}`)
      }

      // Get current visitors count
      const { data: visitorsData, error: visitorsError } = await supabase
        .from("visitors")
        .select("id")
        .eq("destination_room", data.name)
        .eq("is_active", true)

      if (visitorsError) {
        console.error("Error counting visitors:", visitorsError)
      }

      return {
        id: data.id,
        name: data.name,
        maxCapacity: data.max_capacity,
        currentVisitors: visitorsData?.length || 0,
      }
    } catch (error: any) {
      console.error("Error in getRoomById:", error)
      throw error
    }
  },

  // Create new room
  createRoom: async (roomData: Omit<Room, "id" | "currentVisitors">): Promise<Room> => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .insert([
          {
            name: roomData.name,
            max_capacity: roomData.maxCapacity,
            description: `Sala ${roomData.name}`,
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error creating room:", error)
        throw new Error(`Erro ao criar sala: ${error.message}`)
      }

      // Log the action
      try {
        await supabase.from("system_logs").insert([
          {
            action: "ROOM_CREATED",
            entity_type: "room",
            entity_id: data.id,
            details: { room_name: data.name },
          },
        ])
      } catch (logError) {
        console.warn("Failed to log action:", logError)
      }

      return {
        id: data.id,
        name: data.name,
        maxCapacity: data.max_capacity,
        currentVisitors: 0,
      }
    } catch (error: any) {
      console.error("Error in createRoom:", error)
      throw error
    }
  },

  // Update room
  updateRoom: async (id: string, roomData: Partial<Room>): Promise<Room> => {
    try {
      const updateData: any = {}
      if (roomData.name) updateData.name = roomData.name
      if (roomData.maxCapacity) updateData.max_capacity = roomData.maxCapacity

      const { data, error } = await supabase
        .from("rooms")
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        console.error("Error updating room:", error)
        throw new Error(`Erro ao atualizar sala: ${error.message}`)
      }

      // Log the action
      try {
        await supabase.from("system_logs").insert([
          {
            action: "ROOM_UPDATED",
            entity_type: "room",
            entity_id: id,
            details: updateData,
          },
        ])
      } catch (logError) {
        console.warn("Failed to log action:", logError)
      }

      // Get current visitors count
      const { data: visitorsData } = await supabase
        .from("visitors")
        .select("id")
        .eq("destination_room", data.name)
        .eq("is_active", true)

      return {
        id: data.id,
        name: data.name,
        maxCapacity: data.max_capacity,
        currentVisitors: visitorsData?.length || 0,
      }
    } catch (error: any) {
      console.error("Error in updateRoom:", error)
      throw error
    }
  },

  // Delete room
  deleteRoom: async (id: string): Promise<void> => {
    try {
      // Check if room has active visitors
      const { data: room } = await supabase.from("rooms").select("name").eq("id", id).single()

      if (room) {
        const { data: activeVisitors } = await supabase
          .from("visitors")
          .select("id")
          .eq("destination_room", room.name)
          .eq("is_active", true)

        if (activeVisitors && activeVisitors.length > 0) {
          throw new Error("Não é possível excluir sala com visitantes ativos")
        }
      }

      const { error } = await supabase.from("rooms").delete().eq("id", id)

      if (error) {
        console.error("Error deleting room:", error)
        throw new Error(`Erro ao excluir sala: ${error.message}`)
      }

      // Log the action
      try {
        await supabase.from("system_logs").insert([
          {
            action: "ROOM_DELETED",
            entity_type: "room",
            entity_id: id,
          },
        ])
      } catch (logError) {
        console.warn("Failed to log action:", logError)
      }
    } catch (error: any) {
      console.error("Error in deleteRoom:", error)
      throw error
    }
  },
}
