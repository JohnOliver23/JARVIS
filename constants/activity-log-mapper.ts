import { Activity, User, UserPlus, LogOut, Building2 } from "lucide-react";
import type { SystemLog } from "@/types/visitor";

export interface ActivityLogConfig {
  icon: typeof Activity;
  color: string;
  getText: (log: SystemLog) => string;
}

export const activityLogMapper: Record<string, ActivityLogConfig> = {
  VISITOR_CREATED: {
    icon: UserPlus,
    color:
      "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
    getText: (log) => {
      const details = log.details as any;
      return `Visitante ${
        details?.visitor_name || "desconhecido"
      } cadastrado na sala ${details?.room || "desconhecida"}`;
    },
  },
  EXIT_REGISTERED: {
    icon: LogOut,
    color:
      "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
    getText: (log) => {
      const details = log.details as any;
      return `Saída registrada para ${
        details?.visitor_name || "visitante"
      } da sala ${details?.room || "desconhecida"}`;
    },
  },
  ROOM_CREATED: {
    icon: Building2,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
    getText: (log) => {
      const details = log.details as any;
      return `Nova sala "${details?.room_name || "desconhecida"}" foi criada`;
    },
  },
  ROOM_UPDATED: {
    icon: Building2,
    color:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
    getText: (log) => "Sala foi atualizada",
  },
  VISITOR_DELETED: {
    icon: User,
    color: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
    getText: (log) => "Visitante foi removido do sistema",
  },
};

export const getActivityLogConfig = (action: string): ActivityLogConfig => {
  return (
    activityLogMapper[action] || {
      icon: Activity,
      color:
        "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400",
      getText: (log) => `Ação ${log.action} executada`,
    }
  );
};

export const getActivityBadgeText = (action: string): string => {
  const translations: Record<string, string> = {
    VISITOR_CREATED: "Visita Criada",
    EXIT_REGISTERED: "Saída Registrada",
    ROOM_CREATED: "Sala Criada",
    ROOM_UPDATED: "Sala Atualizada",
    VISITOR_DELETED: "Visitante Removido",
  };
  return translations[action] || action.replace(/_/g, " ").toLowerCase();
};
