import { api } from "@/lib/axios"
import type { Visitor, CreateVisitorData, UpdateVisitorData, VisitorStats } from "@/types/visitor"

export const visitorService = {
  // Get all visitors
  getVisitors: async (): Promise<Visitor[]> => {
    const response = await api.get("/visitors")
    return response.data
  },

  // Get active visitors
  getActiveVisitors: async (): Promise<Visitor[]> => {
    const response = await api.get("/visitors?active=true")
    return response.data
  },

  // Get visitor by ID
  getVisitorById: async (id: string): Promise<Visitor> => {
    const response = await api.get(`/visitors/${id}`)
    return response.data
  },

  // Create new visitor
  createVisitor: async (data: CreateVisitorData): Promise<Visitor> => {
    const response = await api.post("/visitors", data)
    return response.data
  },

  // Update visitor
  updateVisitor: async (id: string, data: UpdateVisitorData): Promise<Visitor> => {
    const response = await api.put(`/visitors/${id}`, data)
    return response.data
  },

  // Register visitor exit
  registerExit: async (id: string): Promise<Visitor> => {
    const response = await api.patch(`/visitors/${id}/exit`)
    return response.data
  },

  // Delete visitor
  deleteVisitor: async (id: string): Promise<void> => {
    await api.delete(`/visitors/${id}`)
  },

  // Get visitor statistics
  getStats: async (): Promise<VisitorStats> => {
    const response = await api.get("/visitors/stats")
    return response.data
  },

  // Get visitors by room
  getVisitorsByRoom: async (room: string): Promise<Visitor[]> => {
    const response = await api.get(`/visitors?room=${room}`)
    return response.data
  },
}
