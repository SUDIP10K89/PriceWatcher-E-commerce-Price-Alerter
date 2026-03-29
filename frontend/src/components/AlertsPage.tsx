import React from 'react';
import { Bell, Settings, Trash2, CheckCircle2, Clock, AlertTriangle, Mail, Slack, TrendingDown } from 'lucide-react';
import { Alert } from '../types';
import { cn } from '../lib/utils';

interface AlertsPageProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
  onClearAll: () => void;
}

export default function AlertsPage({ alerts, onDismiss, onClearAll }: AlertsPageProps) {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl tracking-[2px] text-foreground flex items-center gap-3">
            <Bell className="text-accent w-8 h-8" />
            Alert History
          </h1>
          <p className="text-muted text-sm mt-1">You have {alerts.length} active notifications.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onClearAll}
            className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
          <button className="p-2 bg-surface border border-border rounded-none text-muted hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={cn(
              "p-5 bg-surface border border-border rounded-none flex gap-4 relative group transition-all hover:border-accent/30",
              alert.isNew && "border-success/30 bg-success/5"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-none flex items-center justify-center shrink-0",
              alert.type === 'drop' && "bg-success/10 text-success",
              alert.type === 'email' && "bg-warning/10 text-warning",
              alert.type === 'slack' && "bg-info/10 text-info"
            )}>
              {alert.type === 'drop' && <TrendingDown className="w-6 h-6" />}
              {alert.type === 'email' && <Mail className="w-6 h-6" />}
              {alert.type === 'slack' && <Slack className="w-6 h-6" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-foreground truncate">{alert.title}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{alert.subtitle}</p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="text-right">
                <div className="text-xl font-mono font-bold text-success">${alert.price.toLocaleString()}</div>
              </div>
              
              <button 
                onClick={() => onDismiss(alert.id)}
                className="p-2 text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-surface border border-border rounded-none flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-muted/30" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">All caught up!</h3>
            <p className="text-muted">No active alerts at the moment. We'll notify you when prices drop.</p>
          </div>
        )}
      </div>
    </div>
  );
}
