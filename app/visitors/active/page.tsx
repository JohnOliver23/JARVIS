import { VisitorsTable } from "@/components/visitors/visitors-table"

export default function ActiveVisitorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visitantes Ativos</h1>
        <p className="text-muted-foreground">Visitantes que ainda estão na Stark Tower</p>
      </div>

      <VisitorsTable />
    </div>
  )
}
