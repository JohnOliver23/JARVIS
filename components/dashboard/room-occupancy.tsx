"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabaseVisitorStatsQuery } from "@/hooks/use-supabase-visitors-query"
import { Building2, AlertCircle, RefreshCw } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RoomOccupancyCard } from "./room-occupancy-card"

export function RoomOccupancy() {
  const { data: stats, isLoading, error, refetch } = useSupabaseVisitorStatsQuery()

  if (error) {
    return (
      <Card className="jarvis-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Ocupação das Salas
          </CardTitle>
          <CardDescription>Status atual de cada sala</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Erro ao carregar ocupação das salas</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Tentar novamente
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="jarvis-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Ocupação das Salas
          </CardTitle>
          <CardDescription>Status atual de cada sala</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <LoadingSpinner className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Carregando ocupação...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats?.roomsOccupancy || stats.roomsOccupancy.length === 0) {
    return (
      <Card className="jarvis-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Ocupação das Salas
          </CardTitle>
          <CardDescription>Status atual de cada sala</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma sala encontrada</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="jarvis-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-500" />
          Ocupação das Salas
        </CardTitle>
        <CardDescription>Status atual de cada sala</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.roomsOccupancy.map((room) => (
            <RoomOccupancyCard key={room.id} room={room} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
