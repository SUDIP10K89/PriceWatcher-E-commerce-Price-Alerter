import React, { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingDown, 
  Globe, 
  Package, 
  ArrowLeft, 
  ExternalLink, 
  Bell, 
  Info,
  ShoppingBag,
  Cpu,
  Monitor,
  Tag,
  Target,
  Clock,
  Zap,
  Trash2,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';
import { Product } from '../types';
import { cn } from '../lib/utils';

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

interface PriceHistoryProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
}

export default function PriceHistory({ products, onDeleteProduct, onUpdateProduct }: PriceHistoryProps) {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const selectedProduct = products.find(p => p.id === productId);

  const [isEditingThreshold, setIsEditingThreshold] = useState(false);
  const [newThresholdValue, setNewThresholdValue] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!selectedProduct) {
    return <Navigate to="/" replace />;
  }
  
  const lowestPrice = Math.min(...selectedProduct.history.map(h => h.price));
  const highestPrice = Math.max(...selectedProduct.history.map(h => h.price));
  const dropPct = Math.round((selectedProduct.wasPrice - selectedProduct.currentPrice) / selectedProduct.wasPrice * 100);
  const accentColor = dropPct >= 20 ? '#1e8e3e' : dropPct >= 10 ? '#f9ab00' : '#4285f4';
  const StoreIcon = STORE_ICON_MAP[selectedProduct.store] || Globe;
  const storeColor = STORE_COLOR_MAP[selectedProduct.store] || '#888';

  const handleGoToStore = () => {
    // Simulate opening store URL
    const storeUrls: Record<string, string> = {
      'Amazon': 'https://www.amazon.com',
      'Newegg': 'https://www.newegg.com',
      'Best Buy': 'https://www.bestbuy.com',
      'eBay': 'https://www.ebay.com',
      'Daraz': 'https://www.daraz.com.np'
    };
    const url = storeUrls[selectedProduct.store] || 'https://google.com';
    window.open(url, '_blank');
  };

  const handleEditThreshold = () => {
    setNewThresholdValue(selectedProduct.threshold.toString());
    setIsEditingThreshold(true);
  };

  const saveThreshold = () => {
    const value = parseFloat(newThresholdValue);
    if (!isNaN(value)) {
      onUpdateProduct(selectedProduct.id, { 
        threshold: value,
        isBelowThreshold: selectedProduct.currentPrice <= value
      });
      setIsEditingThreshold(false);
    }
  };

  const confirmDelete = () => {
    onDeleteProduct(selectedProduct.id);
    navigate('/');
  };
  
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Breadcrumb / Back */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[2px] text-muted hover:text-accent transition-colors mb-8 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Hero & Main Info */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hero Section - Improved responsiveness to prevent overlaps */}
          <div className="relative aspect-[16/10] md:aspect-[21/9] bg-surface-hover border border-border overflow-hidden group">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            
            {/* Gradient Overlay - Stronger at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            
            {/* Sparkline Overlay - Reduced height on mobile to prevent text overlap */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-2/3 opacity-30 md:opacity-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedProduct.history}>
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={accentColor} 
                    strokeWidth={3} 
                    fill={accentColor}
                    fillOpacity={0.1}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 md:gap-3">
              <div 
                className="w-8 h-8 md:w-10 md:h-10 bg-surface border border-border flex items-center justify-center shadow-lg"
                style={{ color: storeColor }}
              >
                <StoreIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="bg-surface border border-border px-2 py-1 md:px-3 md:py-1.5 shadow-lg">
                <span className="text-[9px] md:text-[10px] font-black text-muted uppercase tracking-widest">
                  {selectedProduct.store}
                </span>
              </div>
            </div>

            {dropPct >= 10 && (
              <div className="absolute top-4 right-4 md:top-6 md:right-6">
                <div className="bg-success text-background text-[10px] md:text-xs font-black px-2 py-0.5 md:px-3 md:py-1 shadow-lg uppercase tracking-wider">
                  -{dropPct}% Drop
                </div>
              </div>
            )}

            {/* Product Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <span className="text-[9px] md:text-[10px] font-black bg-accent text-background px-1.5 py-0.5 uppercase tracking-widest">
                  Live Tracking
                </span>
                <span className="text-[9px] md:text-[10px] font-black text-white/60 uppercase tracking-widest">
                  ID: {selectedProduct.id}
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-4xl tracking-[1px] text-white uppercase leading-tight max-w-2xl">
                {selectedProduct.name}
              </h1>
            </div>
          </div>

          {/* Market Intelligence Grid */}
          <div className="bg-surface border border-border p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black text-muted uppercase tracking-[2px] flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent" />
                Market Intelligence
              </h4>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">Last Checked:</span> {selectedProduct.lastChecked}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <div className="space-y-2">
                <div className="text-[9px] font-black text-muted uppercase tracking-widest">Current Price</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-mono font-black text-foreground">${selectedProduct.currentPrice.toLocaleString()}</span>
                  <span className="text-xs md:text-sm font-mono text-muted line-through">${selectedProduct.wasPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 md:border-l border-border/40 md:pl-10">
                <div className="text-[9px] font-black text-muted uppercase tracking-widest">Lowest Recorded</div>
                <div className="text-2xl md:text-3xl font-mono font-black text-success">${lowestPrice.toLocaleString()}</div>
                <div className="text-[9px] font-bold text-muted uppercase bg-surface-hover px-2 py-1 w-fit">All Time Low</div>
              </div>

              <div className="space-y-2 md:border-l border-border/40 md:pl-10">
                <div className="text-[9px] font-black text-muted uppercase tracking-widest">Highest Recorded</div>
                <div className="text-2xl md:text-3xl font-mono font-black text-red-500">${highestPrice.toLocaleString()}</div>
                <div className="text-[9px] font-bold text-muted uppercase bg-surface-hover px-2 py-1 w-fit">All Time High</div>
              </div>
            </div>
          </div>

          {/* Detailed Price History Graph */}
          <div className="bg-surface border border-border p-6 md:p-8">
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-[10px] font-black text-muted uppercase tracking-[2px] flex items-center gap-2">
                <TrendingDown className="w-3.5 h-3.5 text-accent" />
                Price History Trend
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent" />
                  <span className="text-[9px] font-bold text-muted uppercase tracking-widest">Price ($)</span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedProduct.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={accentColor} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }}
                    domain={['dataMin - 20', 'dataMax + 20']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#151619', 
                      border: '1px solid #2a2b2e',
                      borderRadius: '0px',
                      padding: '12px'
                    }}
                    itemStyle={{ 
                      color: '#fff', 
                      fontSize: '12px', 
                      fontFamily: 'monospace',
                      fontWeight: 900
                    }}
                    labelStyle={{
                      color: '#888',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '4px'
                    }}
                    cursor={{ stroke: '#2a2b2e', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={accentColor} 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-center">
              <div className="text-[9px] font-bold text-muted uppercase tracking-widest">
                Data Range: Last 30 Days
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Alert Configuration */}
        <div className="lg:col-span-4 space-y-6">
          {/* Alert Status Card */}
          <div className="bg-surface border border-border p-8 h-fit">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black text-muted uppercase tracking-[2px] flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-accent" />
                Alert Configuration
              </h4>
              <div className={cn(
                "w-2 h-2 rounded-none",
                selectedProduct.isBelowThreshold ? "bg-success animate-pulse" : "bg-info"
              )} />
            </div>

            <div className="space-y-8">
              <div>
                <div className="text-[9px] font-black text-muted uppercase tracking-widest mb-2">Target Threshold</div>
                {isEditingThreshold ? (
                  <div className="flex items-center gap-2 bg-background border border-accent p-2">
                    <div className="flex-1 flex items-center px-2">
                      <span className="text-accent font-mono font-black mr-1">$</span>
                      <input 
                        type="number"
                        value={newThresholdValue}
                        onChange={(e) => setNewThresholdValue(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-2xl font-mono font-black text-accent p-0"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveThreshold();
                          if (e.key === 'Escape') setIsEditingThreshold(false);
                        }}
                      />
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={saveThreshold}
                        className="w-10 h-10 bg-accent text-background flex items-center justify-center hover:bg-accent-hover transition-colors"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setIsEditingThreshold(false)}
                        className="w-10 h-10 bg-surface-hover text-muted flex items-center justify-center hover:text-foreground transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleEditThreshold}
                    className="w-full flex items-center justify-between bg-background border border-border p-4 group hover:border-accent transition-colors text-left"
                  >
                    <div className="text-3xl font-mono font-black text-accent">${selectedProduct.threshold.toLocaleString()}</div>
                    <Target className="w-5 h-5 text-muted/30 group-hover:text-accent transition-colors" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="text-[9px] font-black text-muted uppercase tracking-widest">Monitoring Status</div>
                <div className={cn(
                  "p-4 border flex items-center gap-4 transition-all",
                  selectedProduct.isBelowThreshold 
                    ? "bg-success/5 border-success/20 text-success" 
                    : "bg-info/5 border-info/20 text-info"
                )}>
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center border",
                    selectedProduct.isBelowThreshold ? "bg-success/10 border-success/20" : "bg-info/10 border-info/20"
                  )}>
                    {selectedProduct.isBelowThreshold ? <Zap className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">
                      {selectedProduct.isBelowThreshold ? 'Target Achieved' : 'Tracking Active'}
                    </div>
                    <div className="text-[9px] opacity-70 uppercase tracking-wider">
                      {selectedProduct.isBelowThreshold 
                        ? 'Price is currently below your threshold' 
                        : 'Waiting for price to drop below threshold'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 flex flex-col gap-3">
                <button 
                  onClick={handleGoToStore}
                  className="w-full py-4 bg-accent text-background text-[11px] font-black uppercase tracking-[2px] hover:bg-accent-hover transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Go to {selectedProduct.store}
                </button>
                <button 
                  onClick={handleEditThreshold}
                  className="w-full py-4 bg-surface-hover text-muted border border-border text-[11px] font-black uppercase tracking-[2px] hover:text-foreground hover:border-muted transition-all"
                >
                  Edit Alert Settings
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full py-4 bg-red-500/5 text-red-500 border border-red-500/20 text-[11px] font-black uppercase tracking-[2px] hover:bg-red-500 hover:text-background hover:border-red-500 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Remove Tracker
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showDeleteConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-md bg-surface border border-red-500/30 p-8 md:p-10 shadow-2xl"
                >
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 bg-red-500 text-background flex items-center justify-center">
                      <AlertTriangle className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-[14px] font-black uppercase tracking-[3px] text-red-500">Confirm Removal</h4>
                      <p className="text-[11px] text-muted uppercase tracking-widest leading-relaxed max-w-[280px]">
                        Are you sure you want to stop tracking this product? All historical data will be lost.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 w-full gap-3 pt-4">
                      <button 
                        onClick={confirmDelete}
                        className="py-4 bg-red-500 text-background text-[11px] font-black uppercase tracking-[2px] hover:bg-red-600 transition-all"
                      >
                        Confirm Delete
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(false)}
                        className="py-4 bg-surface-hover border border-border text-[11px] font-black uppercase tracking-[2px] hover:text-foreground hover:border-muted transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Quick Info */}
          <div className="bg-surface-hover border border-border p-6 border-l-4 border-l-accent">
            <div className="flex gap-4">
              <Info className="w-5 h-5 text-accent shrink-0" />
              <p className="text-[11px] text-muted leading-relaxed uppercase tracking-wider">
                Price data is updated every 15 minutes. Historical data reflects the last 30 days of market activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


