"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, RefreshCw } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useActivityLogs } from "@/hooks/use-activity-logs"
import { ActivityLogCard } from "./activity-log-card"

export function ActivityLogs() {
  const { logs, hasLogs, isLoading, error, refreshLogs } = useActivityLogs(8)

  if (error) {
    return (
      <Card className="jarvis-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
          <CardDescription>Últimas ações no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Erro ao carregar logs de atividade</span>
              <Button variant="outline" size="sm" onClick={refreshLogs}>
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
            <Activity className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
          <CardDescription>Últimas ações no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <LoadingSpinner className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Carregando atividades...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="jarvis-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Atividade Recente
        </CardTitle>
        <CardDescription>Últimas ações no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasLogs ? (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma atividade recente</h3>
            <p className="text-muted-foreground text-sm">As atividades do sistema aparecerão aqui</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <ActivityLogCard key={log.id} log={log} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
