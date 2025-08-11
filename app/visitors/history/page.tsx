"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSupabaseVisitorHistoryQuery } from "@/hooks/use-supabase-visitors-query";
import { useVisitorHistoryFilter } from "@/hooks/use-visitor-history-filter";
import { Search, History, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { calculateDuration, formatDateTime } from "@/lib/utils";

export default function VisitorHistoryPage() {
  const {
    data: visitors = [],
    isLoading,
    error,
    refetch,
  } = useSupabaseVisitorHistoryQuery();

  const { searchTerm, handleChangeSearchTerm, filteredVisitors } =
    useVisitorHistoryFilter(visitors);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Histórico de Visitantes
          </h1>
          <p className="text-muted-foreground">
            Todos os visitantes que já passaram pela Stark Tower
          </p>
        </div>
        <Card className="jarvis-card">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Erro ao carregar histórico. Verifique sua conexão.</span>
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
        <h1 className="text-3xl font-bold tracking-tight">
          Histórico de Visitantes
        </h1>
        <p className="text-muted-foreground">
          Todos os visitantes que já passaram pela Stark Tower
        </p>
      </div>
      <Card className="jarvis-card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-500" /> Histórico Completo
          </CardTitle>
          <CardDescription>Registro de todos os visitantes</CardDescription>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar no histórico..."
                value={searchTerm}
                onChange={handleChangeSearchTerm} // Updated onChange prop
                className="pl-8 jarvis-card-inner"
              />
            </div>
            <Badge variant="secondary" className="jarvis-card-inner">
              {filteredVisitors.length} registro
              {filteredVisitors.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <LoadingSpinner className="mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Carregando histórico...
                </p>
              </div>
            </div>
          ) : filteredVisitors.length === 0 ? (
            <div className="text-center py-12">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchTerm
                  ? "Nenhum registro encontrado"
                  : "Nenhum visitante no histórico"}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Tente ajustar os termos de busca"
                  : "Quando houver visitantes, o histórico aparecerá aqui"}
              </p>
            </div>
          ) : (
            <div className="rounded-md jarvis-card-inner">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800/50 dark:border-gray-800/50">
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Sala</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saída</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitors.map((visitor) => (
                    <TableRow
                      key={visitor.id}
                      className="border-gray-800/30 dark:border-gray-800/30 hover:bg-gray-800/20 dark:hover:bg-gray-800/20"
                    >
                      <TableCell className="font-medium">
                        {visitor.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {visitor.cpf}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="jarvis-card-inner">
                          {visitor.destinationRoom}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDateTime(visitor.entryTime)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {visitor.exitTime ? (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {formatDateTime(visitor.exitTime)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            -
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {calculateDuration(
                            visitor.entryTime,
                            visitor.exitTime
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            visitor.isActive
                              ? "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400"
                              : "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400"
                          }
                        >
                          {visitor.isActive ? "Ativo" : "Finalizado"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
