import { VisitorForm } from "@/components/visitors/visitor-form"

export default function NewVisitorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Visitante</h1>
        <p className="text-muted-foreground">Cadastre um novo visitante no sistema</p>
      </div>

      <VisitorForm />
    </div>
  )
}
