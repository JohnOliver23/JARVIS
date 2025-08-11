"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LogOut,
  Search,
  User,
  Clock,
  AlertCircle,
  RefreshCw,
  SearchX,
} from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { calculateDuration } from "@/lib/utils";
import { useVisitorsTable } from "@/hooks/use-visitors-table";

export function VisitorsTable() {
  const {
    searchTerm,
    handleChangeSearchTerm,
    filteredVisitors,
    isLoading,
    error,
    refetch,
    handleRegisterExit,
    isRegisteringExit,
  } = useVisitorsTable();

  if (error) {
    return (
      <Card className="jarvis-card">
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Erro ao carregar visitantes. Verifique sua conexão.</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                <RefreshCw className="h-4 w-4 mr-1" /> Tentar novamente
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="jarvis-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <LoadingSpinner className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Carregando visitantes...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="jarvis-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-500" /> Visitantes Ativos
        </CardTitle>
        <CardDescription>
          Visitantes que ainda estão na Stark Tower
        </CardDescription>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar visitantes..."
              value={searchTerm}
              onChange={handleChangeSearchTerm} // Updated onChange prop
              className="pl-8"
            />
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {filteredVisitors.length} visitante
            {filteredVisitors.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {filteredVisitors.length === 0 ? (
          <div className="text-center py-12">
            <SearchX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {searchTerm
                ? "Nenhum visitante encontrado"
                : "Nenhum visitante ativo"}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? "Tente ajustar os termos de busca"
                : "Quando houver visitantes ativos, eles aparecerão aqui"}
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-gray-800/50 dark:border-gray-800/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Sala</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisitors.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell className="font-medium">
                      {visitor.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {visitor.cpf}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {visitor.destinationRoom}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {format(
                          new Date(visitor.entryTime),
                          "dd/MM/yyyy HH:mm",
                          {
                            locale: ptBR,
                          }
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {calculateDuration(visitor.entryTime)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400">
                        Ativo
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRegisterExit(visitor.id)}
                        disabled={isRegisteringExit}
                        className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-950"
                      >
                        {isRegisteringExit ? (
                          <LoadingSpinner size="sm" className="mr-1" />
                        ) : (
                          <LogOut className="h-4 w-4 mr-1" />
                        )}
                        Registrar Saída
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
