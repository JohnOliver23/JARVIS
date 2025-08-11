"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useSupabaseVisitorStatsQuery } from "@/hooks/use-supabase-visitors-query"
import { AlertCircle, RefreshCw } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { statsCards } from "@/constants/stats-cards"
import { StatCard } from "./stat-card"

export function StatsCards() {
  const { data: stats, isLoading, error, refetch } = useSupabaseVisitorStatsQuery()

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2 lg:col-span-4 jarvis-card">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Erro ao carregar estatísticas</span>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Tentar novamente
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="jarvis-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-20">
                <LoadingSpinner size="sm" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((card) => (
        <StatCard key={card.title} card={card} stats={stats} />
      ))}
    </div>
  )
}
