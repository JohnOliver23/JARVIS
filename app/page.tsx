import { StatsCards } from "@/components/dashboard/stats-cards";
import { RoomOccupancy } from "@/components/dashboard/room-occupancy";
import { VisitorsTable } from "@/components/visitors/visitors-table";
import { ActivityLogs } from "@/components/dashboard/activity-logs";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema de visitantes da Stark Tower
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2">
        <RoomOccupancy />
        <ActivityLogs />
      </div>
    </div>
  );
}
