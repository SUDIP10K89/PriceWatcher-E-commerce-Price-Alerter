import React, { useState } from 'react';
import { Plus, Link, Target, Bell, Slack, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export default function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
  const [url, setUrl] = useState('');
  const [threshold, setThreshold] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !threshold) return;

    // Create a mock product from the input
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: url.split('/').pop()?.split('?')[0].replace(/-/g, ' ') || "New Product",
      store: url.includes('amazon') ? 'Amazon' : url.includes('newegg') ? 'Newegg' : 'Other',
      icon: 'package',
      image: `https://picsum.photos/seed/${Math.random()}/400/300`,
      currentPrice: 299.99, // Mock price
      wasPrice: 349.99,
      threshold: parseFloat(threshold),
      isBelowThreshold: 299.99 < parseFloat(threshold),
      lastChecked: "Just now",
      history: [
        { date: '1', price: 349.99 },
        { date: '2', price: 299.99 },
      ]
    };

    onAdd(newProduct);
    setUrl('');
    setThreshold('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="bg-surface border border-border rounded-none w-full max-w-[500px] p-7 relative z-10 shadow-lg"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-display text-[22px] tracking-[2px] mb-5 flex items-center gap-2.5">
              <Plus className="w-[18px] h-[18px] text-accent" />
              Track New Product
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] text-muted tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                  <Link className="w-[11px] h-[11px]" /> Product URL
                </label>
                <input 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-background border border-border rounded-none text-foreground text-sm px-3.5 py-2.5 outline-none focus:border-accent transition-colors"
                  placeholder="https://amazon.com/dp/…"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-muted tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                  <Target className="w-[11px] h-[11px]" /> Threshold ($)
                </label>
                <input 
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="w-full bg-background border border-border rounded-none text-foreground text-sm px-3.5 py-2.5 outline-none focus:border-accent transition-colors"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="flex gap-2.5 mt-6">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-none text-sm font-semibold bg-surface-hover text-muted border border-border hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 rounded-none text-sm font-semibold bg-accent text-background flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Start Monitoring
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
