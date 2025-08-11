"use client";

import { Badge } from "@/components/ui/badge";
import {
  getActivityLogConfig,
  getActivityBadgeText,
} from "@/constants/activity-log-mapper";
import { formatDateTime } from "@/lib/utils";
import type { SystemLog } from "@/types/visitor";

interface ActivityLogCardProps {
  log: SystemLog;
}

export function ActivityLogCard({ log }: ActivityLogCardProps) {
  const config = getActivityLogConfig(log.action);
  const badgeText = getActivityBadgeText(log.action); // Get translated text for badge

  return (
    <div className="jarvis-card-inner flex items-start gap-3 p-3 rounded-lg transition-all duration-200">
      <div className="flex-shrink-0 mt-0.5">
        <config.icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-relaxed break-words">
          {config.getText(log)}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="outline" className={`${config.color} text-xs`}>
            {badgeText} {/* Now uses the translated text */}
          </Badge>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDateTime(log.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
