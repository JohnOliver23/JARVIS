"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSupabaseRoomsQuery } from "@/hooks/use-supabase-rooms-query"
import { useVisitorForm } from "@/hooks/use-visitor-form"
import { Loader2, UserPlus, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function VisitorForm() {
  const { data: rooms = [], isLoading: roomsLoading, error: roomsError } = useSupabaseRoomsQuery()

  const { register, handleSubmit, errors, selectedRoom, isSubmitting, handleCPFChange, handleRoomSelect } =
    useVisitorForm()

  if (roomsError) {
    return (
      <Card className="max-w-2xl mx-auto jarvis-card">
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Erro ao carregar salas. Verifique sua conexão com o Supabase.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto jarvis-card-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-blue-500" />
          Cadastrar Novo Visitante
        </CardTitle>
        <CardDescription>Registre um novo visitante na Stark Tower</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Digite o nome completo"
                className={`jarvis-card-inner ${errors.name ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                {...register("cpf")}
                placeholder="000.000.000-00"
                maxLength={14}
                onChange={handleCPFChange}
                className={`jarvis-card-inner ${errors.cpf ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors.cpf && <p className="text-sm text-destructive">{errors.cpf.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="email@exemplo.com"
                className={`jarvis-card-inner ${errors.email ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                {...register("birthDate")}
                className={`jarvis-card-inner ${errors.birthDate ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors.birthDate && <p className="text-sm text-destructive">{errors.birthDate.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destinationRoom">Sala de Destino *</Label>
            <Select onValueChange={handleRoomSelect} value={selectedRoom} disabled={isSubmitting}>
              <SelectTrigger className={`jarvis-card-inner ${errors.destinationRoom ? "border-destructive" : ""}`}>
                <SelectValue placeholder="Selecione uma sala" />
              </SelectTrigger>
              <SelectContent className="jarvis-card">
                {roomsLoading ? (
                  <SelectItem value="loading" disabled>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Carregando salas...
                    </div>
                  </SelectItem>
                ) : rooms.length === 0 ? (
                  <SelectItem value="no-rooms" disabled>
                    Nenhuma sala disponível
                  </SelectItem>
                ) : (
                  rooms.map((room) => {
                    const isRoomFull = room.currentVisitors >= room.maxCapacity
                    return (
                      <SelectItem key={room.id} value={room.name} disabled={isRoomFull}>
                        <div className="flex items-center justify-between w-full">
                          <span>{room.name}</span>
                          <span className={`text-xs ${isRoomFull ? "text-red-500" : "text-muted-foreground"}`}>
                            ({room.currentVisitors}/{room.maxCapacity})
                          </span>
                        </div>
                      </SelectItem>
                    )
                  })
                )}
              </SelectContent>
            </Select>
            {errors.destinationRoom && <p className="text-sm text-destructive">{errors.destinationRoom.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full jarvis-gradient hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Cadastrar Visitante
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
