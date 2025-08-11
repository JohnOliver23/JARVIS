"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSupabaseRoomsQuery } from "@/hooks/use-supabase-rooms-query";
import { Building2, AlertCircle, RefreshCw } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardRoom } from "@/components/room/card-room";

export default function RoomsPage() {
  const {
    data: rooms = [],
    isLoading,
    error,
    refetch,
  } = useSupabaseRoomsQuery();

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Salas</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie as salas da Stark Tower
          </p>
        </div>
        <Card className="jarvis-card">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Erro ao carregar salas. Verifique sua conexão.</span>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                  <RefreshCw className="h-4 w-4 mr-1" /> Tentar novamente
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Salas</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie as salas da Stark Tower
        </p>
      </div>
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="jarvis-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-24">
                  <LoadingSpinner size="sm" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <Card className="jarvis-card">
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Nenhuma sala encontrada
            </h3>
            <p className="text-muted-foreground">
              As salas aparecerão aqui quando forem criadas
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <CardRoom key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
