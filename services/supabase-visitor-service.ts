import { supabase } from "@/lib/supabase"
import type { Visitor, CreateVisitorData, VisitorStats } from "@/types/visitor"

export const supabaseVisitorService = {
  // Get all visitors
  getVisitors: async (): Promise<Visitor[]> => {
    try {
      const { data, error } = await supabase.from("visitors").select("*").order("entry_time", { ascending: false })

      if (error) {
        console.error("Error fetching visitors:", error)
        throw new Error(`Erro ao buscar visitantes: ${error.message}`)
      }

      return (data || []).map((visitor) => ({
        id: visitor.id,
        name: visitor.name,
        cpf: visitor.cpf,
        email: visitor.email || undefined,
        birthDate: visitor.birth_date || undefined,
        destinationRoom: visitor.destination_room,
        entryTime: visitor.entry_time,
        exitTime: visitor.exit_time || undefined,
        isActive: visitor.is_active,
        createdAt: visitor.created_at,
        updatedAt: visitor.updated_at,
      }))
    } catch (error: any) {
      console.error("Error in getVisitors:", error)
      throw error
    }
  },

  // Get active visitors
  getActiveVisitors: async (): Promise<Visitor[]> => {
    try {
      const { data, error } = await supabase
        .from("visitors")
        .select("*")
        .eq("is_active", true)
        .order("entry_time", { ascending: false })

      if (error) {
        console.error("Error fetching active visitors:", error)
        throw new Error(`Erro ao buscar visitantes ativos: ${error.message}`)
      }

      return (data || []).map((visitor) => ({
        id: visitor.id,
        name: visitor.name,
        cpf: visitor.cpf,
        email: visitor.email || undefined,
        birthDate: visitor.birth_date || undefined,
        destinationRoom: visitor.destination_room,
        entryTime: visitor.entry_time,
        exitTime: visitor.exit_time || undefined,
        isActive: visitor.is_active,
        createdAt: visitor.created_at,
        updatedAt: visitor.updated_at,
      }))
    } catch (error: any) {
      console.error("Error in getActiveVisitors:", error)
      throw error
    }
  },

  // Get visitor by ID
  getVisitorById: async (id: string): Promise<Visitor> => {
    try {
      const { data, error } = await supabase.from("visitors").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching visitor:", error)
        throw new Error(`Erro ao buscar visitante: ${error.message}`)
      }

      return {
        id: data.id,
        name: data.name,
        cpf: data.cpf,
        email: data.email || undefined,
        birthDate: data.birth_date || undefined,
        destinationRoom: data.destination_room,
        entryTime: data.entry_time,
        exitTime: data.exit_time || undefined,
        isActive: data.is_active,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    } catch (error: any) {
      console.error("Error in getVisitorById:", error)
      throw error
    }
  },

  // Create new visitor
  createVisitor: async (visitorData: CreateVisitorData): Promise<Visitor> => {
    try {
      // First check room capacity using the function
      const { data: capacityCheck, error: capacityError } = await supabase.rpc("check_room_capacity", {
        room_name: visitorData.destinationRoom,
      })

      if (capacityError) {
        console.error("Error checking room capacity:", capacityError)
        // If function doesn't exist, do manual check
        const { data: room } = await supabase
          .from("rooms")
          .select("max_capacity")
          .eq("name", visitorData.destinationRoom)
          .single()

        const { data: activeVisitors } = await supabase
          .from("visitors")
          .select("id")
          .eq("destination_room", visitorData.destinationRoom)
          .eq("is_active", true)

        if (room && activeVisitors && activeVisitors.length >= room.max_capacity) {
          throw new Error("Sala lotada - capacidade máxima atingida")
        }
      } else if (!capacityCheck.available) {
        throw new Error(capacityCheck.message)
      }

      // Create visitor
      const { data, error } = await supabase
        .from("visitors")
        .insert([
          {
            name: visitorData.name,
            cpf: visitorData.cpf,
            email: visitorData.email || null,
            birth_date: visitorData.birthDate || null,
            destination_room: visitorData.destinationRoom,
            entry_time: new Date().toISOString(),
            is_active: true,
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Error creating visitor:", error)
        throw new Error(`Erro ao cadastrar visitante: ${error.message}`)
      }

      // Log the action
      try {
        await supabase.from("system_logs").insert([
          {
            action: "VISITOR_CREATED",
            entity_type: "visitor",
            entity_id: data.id,
            details: {
              visitor_name: data.name,
              room: data.destination_room,
            },
          },
        ])
      } catch (logError) {
        console.warn("Failed to log action:", logError)
      }

      return {
        id: data.id,
        name: data.name,
        cpf: data.cpf,
        email: data.email || undefined,
        birthDate: data.birth_date || undefined,
        destinationRoom: data.destination_room,
        entryTime: data.entry_time,
        exitTime: data.exit_time || undefined,
        isActive: data.is_active,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    } catch (error: any) {
      console.error("Error in createVisitor:", error)
      throw error
    }
  },

  // Register visitor exit
  registerExit: async (id: string): Promise<Visitor> => {
    try {
      // Try using the function first
      const { data: functionResult, error: functionError } = await supabase.rpc("register_visitor_exit", {
        visitor_id: id,
      })

      if (!functionError && functionResult?.success) {
        return {
          id: functionResult.visitor.id,
          name: functionResult.visitor.name,
          cpf: functionResult.visitor.cpf,
          email: functionResult.visitor.email || undefined,
          birthDate: functionResult.visitor.birth_date || undefined,
          destinationRoom: functionResult.visitor.destination_room,
          entryTime: functionResult.visitor.entry_time,
          exitTime: functionResult.visitor.exit_time || undefined,
          isActive: functionResult.visitor.is_active,
          createdAt: functionResult.visitor.created_at,
          updatedAt: functionResult.visitor.updated_at,
        }
      }

      // Fallback to manual update if function doesn't exist
      const { data, error } = await supabase
        .from("visitors")
        .update({
          exit_time: new Date().toISOString(),
          is_active: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("is_active", true)
        .select()
        .single()

      if (error) {
        console.error("Error registering exit:", error)
        throw new Error(`Erro ao registrar saída: ${error.message}`)
      }

      if (!data) {
        throw new Error("Visitante não encontrado ou já registrou saída")
      }

      // Log the action
      try {
        await supabase.from("system_logs").insert([
          {
            action: "EXIT_REGISTERED",
            entity_type: "visitor",
            entity_id: id,
            details: {
              visitor_name: data.name,
              room: data.destination_room,
            },
          },
        ])
      } catch (logError) {
        console.warn("Failed to log action:", logError)
      }

      return {
        id: data.id,
        name: data.name,
        cpf: data.cpf,
        email: data.email || undefined,
        birthDate: data.birth_date || undefined,
        destinationRoom: data.destination_room,
        entryTime: data.entry_time,
        exitTime: data.exit_time || undefined,
        isActive: data.is_active,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    } catch (error: any) {
      console.error("Error in registerExit:", error)
      throw error
    }
  },

  // Get visitor statistics
  getStats: async (): Promise<VisitorStats> => {
    try {
      // Try using the function first
      const { data: functionResult, error: functionError } = await supabase.rpc("get_visitor_statistics")

      if (!functionError && functionResult) {
        return functionResult
      }

      // Fallback to manual queries if function doesn't exist
      console.warn("Function get_visitor_statistics not found, using fallback queries")

      const [visitorsResult, roomsResult] = await Promise.all([
        supabase.from("visitors").select("*"),
        supabase.from("rooms").select("*").eq("is_active", true),
      ])

      if (visitorsResult.error) throw visitorsResult.error
      if (roomsResult.error) throw roomsResult.error

      const visitors = visitorsResult.data || []
      const rooms = roomsResult.data || []

      // Helper function to check if a date is today (more robust)
      const isToday = (dateString: string): boolean => {
        if (!dateString) return false

        try {
          const date = new Date(dateString)
          const today = new Date()

          // Compare year, month, and day
          return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          )
        } catch (error) {
          console.error("Error parsing date:", dateString, error)
          return false
        }
      }

      // Debug information
      const now = new Date()
      console.log("=== DEBUG STATS ===")
      console.log("Current date:", now.toISOString())
      console.log("Current local date:", now.toLocaleDateString())
      console.log("Current date parts:", {
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
      })

      console.log("All visitors with dates:")
      visitors.forEach((visitor, index) => {
        const entryDate = visitor.entry_time ? new Date(visitor.entry_time) : null
        const exitDate = visitor.exit_time ? new Date(visitor.exit_time) : null

        console.log(`${index + 1}. ${visitor.name}:`)
        console.log(
          `   Entry: ${visitor.entry_time} -> ${entryDate?.toLocaleDateString()} -> isToday: ${isToday(visitor.entry_time)}`,
        )
        if (visitor.exit_time) {
          console.log(
            `   Exit: ${visitor.exit_time} -> ${exitDate?.toLocaleDateString()} -> isToday: ${isToday(visitor.exit_time)}`,
          )
        }
      })

      // Calculate stats
      const todayEntries = visitors.filter((visitor) => isToday(visitor.entry_time))
      const todayExits = visitors.filter((visitor) => visitor.exit_time && isToday(visitor.exit_time))

      console.log("Today entries count:", todayEntries.length)
      console.log("Today exits count:", todayExits.length)
      console.log("=== END DEBUG ===")

      const stats = {
        totalVisitors: visitors.length,
        activeVisitors: visitors.filter((v) => v.is_active).length,
        todayEntries: todayEntries.length,
        todayExits: todayExits.length,
        roomsOccupancy: await Promise.all(
          rooms.map(async (room) => {
            const { data: activeVisitors } = await supabase
              .from("visitors")
              .select("id")
              .eq("destination_room", room.name)
              .eq("is_active", true)

            return {
              id: room.id,
              name: room.name,
              maxCapacity: room.max_capacity,
              currentVisitors: activeVisitors?.length || 0,
            }
          }),
        ),
      }

      return stats
    } catch (error: any) {
      console.error("Error in getStats:", error)
      // Return default stats if everything fails
      return {
        totalVisitors: 0,
        activeVisitors: 0,
        todayEntries: 0,
        todayExits: 0,
        roomsOccupancy: [],
      }
    }
  },

  // Get visitor history
  getVisitorHistory: async (): Promise<Visitor[]> => {
    try {
      // Try using the view first
      const { data: viewData, error: viewError } = await supabase
        .from("visitor_history" as any)
        .select("*")
        .order("entry_time", { ascending: false })

      if (!viewError && viewData) {
        return viewData.map((visitor: any) => ({
          id: visitor.id,
          name: visitor.name,
          cpf: visitor.cpf,
          email: visitor.email || undefined,
          birthDate: visitor.birth_date || undefined,
          destinationRoom: visitor.destination_room,
          entryTime: visitor.entry_time,
          exitTime: visitor.exit_time || undefined,
          isActive: visitor.is_active,
          createdAt: visitor.created_at,
          updatedAt: visitor.updated_at,
        }))
      }

      // Fallback to regular table if view doesn't exist
      return await this.getVisitors()
    } catch (error: any) {
      console.error("Error in getVisitorHistory:", error)
      throw error
    }
  },

  // Delete visitor (for admin purposes)
  deleteVisitor: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase.from("visitors").delete().eq("id", id)

      if (error) {
        console.error("Error deleting visitor:", error)
        throw new Error(`Erro ao excluir visitante: ${error.message}`)
      }

      // Log the action
      try {
        await supabase.from("system_logs").insert([
          {
            action: "VISITOR_DELETED",
            entity_type: "visitor",
            entity_id: id,
          },
        ])
      } catch (logError) {
        console.warn("Failed to log action:", logError)
      }
    } catch (error: any) {
      console.error("Error in deleteVisitor:", error)
      throw error
    }
  },
}
