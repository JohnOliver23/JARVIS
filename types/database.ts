export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string
          name: string
          max_capacity: number
          description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          max_capacity?: number
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          max_capacity?: number
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      visitors: {
        Row: {
          id: string
          name: string
          cpf: string
          email: string | null
          birth_date: string | null
          destination_room: string
          entry_time: string
          exit_time: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          cpf: string
          email?: string | null
          birth_date?: string | null
          destination_room: string
          entry_time?: string
          exit_time?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          cpf?: string
          email?: string | null
          birth_date?: string | null
          destination_room?: string
          entry_time?: string
          exit_time?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      system_logs: {
        Row: {
          id: string
          action: string
          entity_type: string
          entity_id: string | null
          user_id: string | null
          details: any | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          entity_type: string
          entity_id?: string | null
          user_id?: string | null
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          action?: string
          entity_type?: string
          entity_id?: string | null
          user_id?: string | null
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      visitor_stats: {
        Row: {
          total_visitors: number
          active_visitors: number
          today_entries: number
          today_exits: number
        }
      }
      room_occupancy: {
        Row: {
          id: string
          name: string
          max_capacity: number
          current_visitors: number
          description: string | null
          is_active: boolean
        }
      }
    }
    Functions: {
      get_visitor_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          totalVisitors: number
          activeVisitors: number
          todayEntries: number
          todayExits: number
          roomsOccupancy: Array<{
            id: string
            name: string
            maxCapacity: number
            currentVisitors: number
          }>
        }
      }
      register_visitor_exit: {
        Args: {
          visitor_id: string
        }
        Returns: {
          success: boolean
          message: string
          visitor?: any
        }
      }
      check_room_capacity: {
        Args: {
          room_name: string
        }
        Returns: {
          available: boolean
          message: string
          currentVisitors: number
          maxCapacity: number
        }
      }
    }
  }
}
