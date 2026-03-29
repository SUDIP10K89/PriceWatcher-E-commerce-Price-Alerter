import React from 'react';
import { TrendingDown, Mail, Slack, ArrowRight, ArrowDown, Activity, X } from 'lucide-react';
import { Alert } from '../types';
import { cn } from '../lib/utils';

interface AlertFeedProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export default function AlertFeed({ alerts, onDismiss }: AlertFeedProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="px-4 md:px-8 pt-6 pb-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[11px] font-bold text-muted uppercase tracking-[2px] flex items-center gap-2">
          <Activity className="w-3 h-3 text-accent" />
          Live Alerts
        </h2>
        <button className="text-[10px] text-muted hover:text-accent transition-colors uppercase tracking-wider font-bold">
          View all
        </button>
      </div>

      <div className="space-y-2">
        {alerts.slice(0, 3).map((alert) => (
          <div 
            key={alert.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-none border border-border bg-surface cursor-pointer transition-all hover:border-accent/30 group relative",
              alert.isNew && "border-success/20 bg-success/5"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-none flex items-center justify-center shrink-0",
              alert.type === 'drop' && "bg-success/10 text-success",
              alert.type === 'slack' && "bg-info/10 text-info",
              alert.type === 'email' && "bg-warning/10 text-warning"
            )}>
              {alert.type === 'drop' && <TrendingDown className="w-4 h-4" />}
              {alert.type === 'slack' && <Slack className="w-4 h-4" />}
              {alert.type === 'email' && <Mail className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-foreground truncate">{alert.title}</div>
              <div className="text-[11px] text-muted truncate">{alert.subtitle}</div>
            </div>

            <div className="text-right shrink-0">
              <div className="font-mono text-sm font-bold text-success">
                ${alert.price.toLocaleString()}
              </div>
              <div className="text-[10px] text-muted line-through">
                ${alert.wasPrice.toLocaleString()}
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDismiss(alert.id);
              }}
              className="p-1.5 text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
