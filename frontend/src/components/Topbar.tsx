import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, LogOut, Settings, ChevronDown, X, Command } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Product } from '../types';

interface TopbarProps {
  onSearch: (query: string) => void;
  onLogout: () => void;
  products: Product[];
}

export default function Topbar({ onSearch, onLogout, products }: TopbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAlertsActive = location.pathname === '/alerts';
  const isSettingsActive = location.pathname === '/settings';

  const filteredSuggestions = searchQuery.trim() 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchInputRef.current && !searchInputRef.current.parentElement?.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    onSearch(val);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
    searchInputRef.current?.focus();
  };

  const handleSuggestionClick = (productId: string) => {
    navigate(`/history/${productId}`);
    setIsSearchFocused(false);
    setSearchQuery('');
    onSearch('');
  };

  // Close dropdown when location changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-surface border-b border-border flex items-center justify-between gap-2 md:gap-4 px-3 md:px-6 z-50">
      <div className="flex-1 max-w-[520px] flex items-center min-w-0 relative">
        <div className="relative flex-1 flex items-center group">
          <div className="absolute left-3 text-muted group-focus-within:text-accent transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input 
            ref={searchInputRef}
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full bg-background border border-border rounded-none text-sm pl-10 pr-12 py-2 outline-none focus:border-accent transition-all placeholder:text-muted truncate"
            placeholder="Search products… (Press /)"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <div className="absolute right-3 flex items-center gap-2">
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="p-1 hover:bg-surface-hover text-muted hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            {!searchQuery && !isSearchFocused && (
              <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 border border-border bg-surface-hover rounded-none text-[9px] font-black text-muted uppercase tracking-widest">
                <Command className="w-2 h-2" /> /
              </div>
            )}
          </div>
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {isSearchFocused && filteredSuggestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border shadow-xl z-[100] overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-border bg-surface-hover">
                <span className="text-[10px] font-black text-muted uppercase tracking-[2px]">Quick Results</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {filteredSuggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-hover transition-colors text-left group"
                  >
                    <div className="w-8 h-8 bg-background border border-border overflow-hidden shrink-0">
                      <img src={product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-foreground truncate group-hover:text-accent transition-colors">
                        {product.name}
                      </div>
                      <div className="text-[10px] text-muted uppercase tracking-wider">
                        {product.store} · ${product.currentPrice}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-1 md:gap-2 shrink-0 relative">
        <Link 
          to="/alerts"
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-none transition-all relative",
            isAlertsActive ? "bg-accent/10 text-accent" : "text-muted hover:bg-surface-hover hover:text-foreground"
          )}
          title="Alerts"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-accent rounded-none border-2 border-surface animate-pulse-soft" />
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              "flex items-center gap-2 p-1 rounded-none hover:bg-surface-hover transition-colors",
              isDropdownOpen && "bg-surface-hover"
            )}
          >
            <div className="w-8 h-8 md:w-[34px] md:h-[34px] rounded-none bg-gradient-to-br from-accent to-warning flex items-center justify-center font-bold text-[10px] md:text-[12px] tracking-wider shrink-0 text-background">
              SP
            </div>
            <ChevronDown className={cn(
              "w-4 h-4 text-muted transition-transform duration-200",
              isDropdownOpen && "rotate-180"
            )} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2 w-[220px] bg-surface border border-border rounded-none shadow-lg overflow-hidden py-1.5 z-[100]"
              >
                <div className="px-4 py-2 border-b border-border mb-1.5">
                  <p className="text-xs font-bold text-muted uppercase tracking-wider">Account</p>
                  <p className="text-sm font-medium text-foreground truncate">sudip10k89@gmail.com</p>
                </div>

                <Link 
                  to="/alerts"
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 text-sm transition-colors",
                    isAlertsActive ? "bg-accent/10 text-accent" : "text-muted hover:bg-surface-hover hover:text-foreground"
                  )}
                >
                  <div className="relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-0.5 -right-0.5 w-[6px] h-[6px] bg-accent rounded-none border border-surface" />
                  </div>
                  Alerts
                </Link>

                <Link 
                  to="/settings"
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 text-sm transition-colors",
                    isSettingsActive ? "bg-accent/10 text-accent" : "text-muted hover:bg-surface-hover hover:text-foreground"
                  )}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>

                <div className="h-px bg-border my-1.5" />

                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-muted hover:bg-surface-hover hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
