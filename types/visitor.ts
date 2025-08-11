export interface Visitor {
  id: string
  name: string
  cpf: string
  email?: string
  birthDate?: string
  destinationRoom: string
  entryTime: string
  exitTime?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateVisitorData {
  name: string
  cpf: string
  email?: string
  birthDate?: string
  destinationRoom: string
}

export interface UpdateVisitorData extends Partial<CreateVisitorData> {
  exitTime?: string
  isActive?: boolean
}

export interface Room {
  id: string
  name: string
  maxCapacity: number
  currentVisitors: number
}

export interface VisitorStats {
  totalVisitors: number
  activeVisitors: number
  todayEntries: number
  todayExits: number
  roomsOccupancy: Room[]
}

export interface SystemLog {
  id: string
  action: string
  entityType: string
  entityId?: string
  userId?: string
  details?: any
  ipAddress?: string
  userAgent?: string
  createdAt: string
}
