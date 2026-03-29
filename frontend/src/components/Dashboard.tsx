import React, { useState, useMemo } from 'react';
import HeroStats from './HeroStats';
import ProductGrid from './ProductGrid';
import { Activity, TrendingDown, Zap, ShoppingBag, Globe, Tag, Cpu, Monitor, SearchX, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';
import { Product } from '../types';

interface DashboardProps {
  products: Product[];
  searchQuery: string;
  onDeleteProduct: (id: string) => void;
}

export default function Dashboard({ products, searchQuery, onDeleteProduct }: DashboardProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { label: 'All', icon: Activity },
    { label: 'Price Dropped', icon: TrendingDown },
    { label: 'Below Threshold', icon: Zap },
    { label: 'Amazon', icon: ShoppingBag },
    { label: 'Daraz', icon: Globe },
    { label: 'eBay', icon: Tag },
    { label: 'Newegg', icon: Cpu },
    { label: 'Best Buy', icon: Monitor },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(query) ||
                          product.store.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;

      if (activeFilter === 'All') return true;
      if (activeFilter === 'Price Dropped') return product.currentPrice < product.wasPrice;
      if (activeFilter === 'Below Threshold') return product.isBelowThreshold;
      
      return product.store === activeFilter;
    });
  }, [products, activeFilter, searchQuery]);

  const resetFilters = () => {
    setActiveFilter('All');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroStats />

      <div className="flex-1 space-y-8 py-6">
        <div className="space-y-4">
          {/* Filter Tabs */}
          <div className="px-4 md:px-8 flex items-center gap-2 border-b border-border overflow-x-auto no-scrollbar py-1">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold cursor-pointer whitespace-nowrap rounded-none transition-all uppercase tracking-wider",
                  activeFilter === filter.label 
                    ? "text-accent bg-accent/10" 
                    : "text-muted hover:text-foreground hover:bg-surface-hover"
                )}
              >
                <filter.icon className="w-3 h-3" />
                {filter.label}
              </button>
            ))}
          </div>

          <div>
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} onDelete={onDeleteProduct} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-20 h-20 bg-surface-hover border border-border flex items-center justify-center mb-6">
                  <SearchX className="w-10 h-10 text-muted/30" />
                </div>
                <h3 className="font-display text-2xl tracking-wider uppercase mb-2">No matches found</h3>
                <p className="text-muted text-sm max-w-md mb-8">
                  We couldn't find any products matching "{searchQuery}" in the {activeFilter} category. Try adjusting your search or filters.
                </p>
                <button 
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-background border border-accent rounded-none text-[11px] font-black uppercase tracking-widest hover:bg-accent-hover transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
