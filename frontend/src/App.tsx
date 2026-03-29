import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import AlertsPage from './components/AlertsPage';
import PriceHistory from './components/PriceHistory';
import SettingsPage from './components/SettingsPage';
import AddProductModal from './components/AddProductModal';
import AuthPage from './components/AuthPage';
import { Plus } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ALERTS, Product, Alert } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleDismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleClearAllAlerts = () => {
    setAlerts([]);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Topbar 
          onSearch={setSearchQuery} 
          onLogout={() => setIsAuthenticated(false)} 
          products={products}
        />
        
        <main className="pt-[60px]">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  products={products} 
                  searchQuery={searchQuery} 
                  onDeleteProduct={handleDeleteProduct}
                />
              } 
            />
            <Route 
              path="/alerts" 
              element={
                <AlertsPage 
                  alerts={alerts} 
                  onDismiss={handleDismissAlert} 
                  onClearAll={handleClearAllAlerts}
                />
              } 
            />
            <Route 
              path="/history/:productId" 
              element={
                <PriceHistory 
                  products={products} 
                  onDeleteProduct={handleDeleteProduct}
                  onUpdateProduct={handleUpdateProduct}
                />
              } 
            />
            <Route path="/history" element={<Navigate to="/" replace />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* FAB */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-7 right-7 w-[52px] h-[52px] rounded-none bg-accent text-background flex items-center justify-center shadow-[0_4px_24px_rgba(26,115,232,0.4)] z-[200] hover:scale-110 hover:shadow-[0_6px_32px_rgba(26,115,232,0.55)] transition-all active:scale-95 border-2 border-background"
        >
          <Plus className="w-[22px] h-[22px] stroke-[2.5px]" />
        </button>

        <AddProductModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddProduct}
        />
      </div>
    </Router>
  );
}
