import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingDown, 
  Zap, 
  Clock, 
  Target, 
  Package, 
  ArrowRight,
  Headphones,
  Monitor,
  MousePointer2,
  HardDrive,
  Airplay,
  Keyboard,
  Battery,
  ShoppingBag,
  Globe,
  Tag,
  Cpu,
  LayoutGrid,
  List,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Product } from '../types';
import { cn } from '../lib/utils';

const ICON_MAP: Record<string, any> = {
  headphones: Headphones,
  monitor: Monitor,
  mouse: MousePointer2,
  hdd: HardDrive,
  airplay: Airplay,
  keyboard: Keyboard,
  battery: Battery,
};

const STORE_ICON_MAP: Record<string, any> = {
  'Amazon': ShoppingBag,
  'Newegg': Cpu,
  'Best Buy': Monitor,
  'eBay': Tag,
  'Daraz': Globe,
};

const STORE_COLOR_MAP: Record<string, string> = {
  'Amazon': '#ff9900',
  'Newegg': '#e3131a',
  'Best Buy': '#003087',
  'eBay': '#86b817',
  'Daraz': '#f15a29',
};

const ProductCard: React.FC<{ product: Product; onDelete: (id: string) => void }> = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const dropPct = Math.round((product.wasPrice - product.currentPrice) / product.wasPrice * 100);
  const accentColor = dropPct >= 20 ? '#1e8e3e' : dropPct >= 10 ? '#f9ab00' : '#4285f4';
  const Icon = ICON_MAP[product.icon] || Package;
  const StoreIcon = STORE_ICON_MAP[product.store] || Globe;
  const storeColor = STORE_COLOR_MAP[product.store] || '#888';

  return (
    <div 
      onClick={() => navigate(`/history/${product.id}`)}
      className={cn(
        "bg-surface group cursor-pointer transition-all relative overflow-hidden border border-border rounded-none hover:shadow-xl hover:-translate-y-1",
        product.isBelowThreshold ? "border-l-4 border-l-success" : "hover:border-accent/40"
      )}
    >
      <div className="relative aspect-[16/10] bg-surface-hover overflow-hidden flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        
        {/* Gradient Overlay for better badge visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-60" />
        
        {/* Sparkline Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-30 group-hover:opacity-60 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={product.history}>
              <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={accentColor} 
                strokeWidth={2} 
                fill={accentColor}
                fillOpacity={0.05}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div 
            className="w-7 h-7 rounded-none flex items-center justify-center bg-surface border border-border shadow-sm"
            style={{ color: storeColor }}
          >
            <StoreIcon className="w-4 h-4" />
          </div>
        </div>

        {dropPct >= 10 && (
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
            <span className="bg-success text-background text-[10px] font-bold px-2 py-0.5 rounded-none shadow-sm">
              -{dropPct}%
            </span>
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/history/${product.id}`);
            }}
            className="w-10 h-10 bg-surface border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-background hover:border-accent transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="View Analytics"
          >
            <TrendingDown className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // In a real app, this would open the external URL
            }}
            className="w-10 h-10 bg-surface border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-background hover:border-accent transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-[50ms]"
            title="Open Store"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <h3 className="text-[14px] font-bold leading-tight text-foreground truncate group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-[11px] text-muted font-medium mt-0.5">{product.store}</p>
          </div>
          {product.isBelowThreshold && (
            <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-none bg-success text-background text-[8px] font-black uppercase tracking-tighter">
              HIT
            </span>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider leading-none mb-1">Current Price</span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-black text-foreground">
                ${product.currentPrice.toLocaleString()}
              </span>
              <span className="font-mono text-[12px] text-muted line-through opacity-60">
                ${product.wasPrice.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider leading-none mb-1">Target</span>
            <div className={cn(
              "font-mono text-sm font-bold px-2 py-0.5 border",
              product.isBelowThreshold ? "bg-success/10 text-success border-success/30" : "bg-surface-hover text-muted border-border"
            )}>
              ${product.threshold.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
          <div className="flex items-center gap-1.5 text-[10px] text-muted font-medium">
            <Clock className="w-3 h-3 text-accent/60" /> 
            <span>Updated {product.lastChecked}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={cn(
              "w-1.5 h-1.5 rounded-none",
              product.isBelowThreshold ? "bg-success animate-pulse" : "bg-info/40"
            )} />
            <span className="text-[9px] font-bold text-muted uppercase tracking-widest">
              {product.isBelowThreshold ? 'Active Alert' : 'Tracking'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductGridProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductGrid({ products, onDelete }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg tracking-[2px] text-foreground flex items-center gap-2">
          <Package className="w-4 h-4" />
          Tracked Products
        </h2>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface border border-border rounded-none p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-1.5 rounded-none transition-all",
                viewMode === 'grid' ? "bg-accent/10 text-accent" : "text-muted hover:text-foreground"
              )}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-1.5 rounded-none transition-all",
                viewMode === 'list' ? "bg-accent/10 text-accent" : "text-muted hover:text-foreground"
              )}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          <button className="hidden sm:flex text-[12px] text-accent cursor-pointer tracking-wider items-center gap-1 hover:underline">
            Sort: Price Drop % <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={onDelete} />
          ))}
          {products.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-border rounded-none">
              <Package className="w-12 h-12 text-muted mx-auto mb-4" />
              <p className="text-muted">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-none overflow-hidden shadow-sm">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-hover border-b border-border">
                  <th className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-[2px]">Product Details</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-[2px]">Store</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-[2px]">Price Dynamics</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-[2px]">Target</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-[2px]">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted uppercase tracking-[2px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {products.map((product) => {
                  const dropPct = Math.round((product.wasPrice - product.currentPrice) / product.wasPrice * 100);
                  const accentColor = dropPct >= 20 ? '#1e8e3e' : dropPct >= 10 ? '#f9ab00' : '#4285f4';
                  const StoreIcon = STORE_ICON_MAP[product.store] || Globe;
                  const storeColor = STORE_COLOR_MAP[product.store] || '#888';
                  
                  return (
                    <tr 
                      key={product.id} 
                      onClick={() => navigate(`/history/${product.id}`)}
                      className={cn(
                        "hover:bg-surface-hover/50 transition-all group cursor-pointer relative",
                        product.isBelowThreshold && "bg-success/[0.02]"
                      )}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-none bg-background border border-border overflow-hidden flex items-center justify-center shrink-0 group-hover:border-accent/30 transition-colors">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[14px] font-bold text-foreground truncate max-w-[200px] lg:max-w-[320px] group-hover:text-accent transition-colors">
                              {product.name}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-muted/60" />
                              <span className="text-[10px] text-muted font-medium uppercase tracking-wider">Updated {product.lastChecked}</span>
                            </div>
                          </div>
                        </div>
                        {product.isBelowThreshold && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-success" />
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-none flex items-center justify-center bg-background border border-border" style={{ color: storeColor }}>
                            <StoreIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm font-bold text-muted/80">{product.store}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-mono font-black text-foreground">
                              ${product.currentPrice.toLocaleString()}
                            </span>
                            {dropPct > 0 && (
                              <span className="text-[10px] bg-success text-background font-black px-1.5 py-0.5 rounded-none whitespace-nowrap">
                                -{dropPct}%
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-muted line-through opacity-60">
                            ${product.wasPrice.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={cn(
                          "inline-block px-2 py-1 font-mono text-xs font-bold border",
                          product.isBelowThreshold ? "bg-success/10 text-success border-success/30" : "bg-background text-muted border-border"
                        )}>
                          ${product.threshold.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-none",
                            product.isBelowThreshold ? "bg-success animate-pulse" : "bg-info/40"
                          )} />
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-[1px]",
                            product.isBelowThreshold ? "text-success" : "text-muted"
                          )}>
                            {product.isBelowThreshold ? 'Target Hit' : 'Monitoring'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/history/${product.id}`);
                            }}
                            className="p-2 text-muted hover:text-accent hover:bg-accent/5 transition-all" 
                            title="View Analytics"
                          >
                            <TrendingDown className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="p-2 text-muted hover:text-accent hover:bg-accent/5 transition-all" 
                            title="Open Store"
                          >
                            <ExternalLink className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="md:hidden divide-y divide-border/60">
            {products.map((product) => {
              const dropPct = Math.round((product.wasPrice - product.currentPrice) / product.wasPrice * 100);
              const accentColor = dropPct >= 20 ? '#1e8e3e' : dropPct >= 10 ? '#f9ab00' : '#4285f4';
              const StoreIcon = STORE_ICON_MAP[product.store] || Globe;
              const storeColor = STORE_COLOR_MAP[product.store] || '#888';

              return (
                <div 
                  key={product.id} 
                  onClick={() => navigate(`/history/${product.id}`)}
                  className={cn(
                    "p-5 space-y-4 cursor-pointer hover:bg-surface-hover/50 transition-colors relative",
                    product.isBelowThreshold && "bg-success/[0.02]"
                  )}
                >
                  {product.isBelowThreshold && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-success" />
                  )}
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-none bg-background border border-border overflow-hidden flex items-center justify-center shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-bold text-foreground truncate">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-4 h-4 rounded-none flex items-center justify-center bg-background border border-border" style={{ color: storeColor }}>
                            <StoreIcon className="w-2.5 h-2.5" />
                          </div>
                          <span className="text-[11px] text-muted font-bold uppercase tracking-wider">{product.store}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {/* Delete button removed from here, moved to Price History */}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex-1 grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-[9px] text-muted uppercase font-black tracking-widest mb-1">Current</div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base font-mono font-black text-foreground">${product.currentPrice.toLocaleString()}</span>
                          {dropPct > 0 && (
                            <span className="text-[9px] bg-success text-background font-black px-1 py-0.5 rounded-none whitespace-nowrap">-{dropPct}%</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] text-muted uppercase font-black tracking-widest mb-1">Target</div>
                        <div className={cn(
                          "text-sm font-mono font-bold",
                          product.isBelowThreshold ? "text-success" : "text-muted"
                        )}>${product.threshold.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted font-medium">
                      <Clock className="w-3 h-3 text-accent/60" /> 
                      <span>Updated {product.lastChecked}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-none",
                        product.isBelowThreshold ? "bg-success animate-pulse" : "bg-info/40"
                      )} />
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest",
                        product.isBelowThreshold ? "text-success" : "text-muted"
                      )}>
                        {product.isBelowThreshold ? 'Target Hit' : 'Monitoring'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="px-6 py-20 text-center text-muted italic">
              No products found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
