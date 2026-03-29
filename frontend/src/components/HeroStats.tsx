import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export default function HeroStats() {
  const stats = [
    { label: 'Tracked', value: '24', color: 'text-foreground' },
    { label: 'Saved', value: '$284', color: 'text-success' },
    { label: 'Interval', value: '1h', color: 'text-info' },
  ];

  return (
    <div className="bg-surface border-b border-border px-4 md:px-8 py-3 md:py-4 flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar relative">
      {/* Scanning Line Animation */}
      <motion.div 
        initial={{ left: '-10%' }}
        animate={{ left: '110%' }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 1
        }}
        className="absolute bottom-0 h-[1px] w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent z-10"
      />

      {stats.map((stat, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col gap-0.5 shrink-0">
            <motion.span 
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              className={`font-display text-xl md:text-2xl leading-none tracking-tight ${stat.color}`}
            >
              {stat.value}
            </motion.span>
            <span className="text-[8px] md:text-[10px] text-muted tracking-wider uppercase font-medium">
              {stat.label}
            </span>
          </div>
          {idx < stats.length - 1 && (
            <div className="hidden sm:block w-px h-6 md:h-8 bg-border/50 shrink-0" />
          )}
        </React.Fragment>
      ))}

      <div className="ml-auto flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1.5">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1.5 h-1.5 bg-success rounded-none"
            />
            <span className="text-[10px] font-bold text-success uppercase tracking-widest">Live</span>
          </div>
          <span className="text-[8px] text-muted uppercase tracking-tighter font-medium">Monitoring Active</span>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="p-1.5 rounded-none bg-surface-hover border border-border"
        >
          <Activity className="w-3 h-3 text-accent" />
        </motion.div>
      </div>
    </div>
  );
}
