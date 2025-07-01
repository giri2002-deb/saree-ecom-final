import React, { useState, useEffect } from 'react';
import { Plus, Package } from 'lucide-react';
import { Product } from '../../types/Product';
import ProductTable from '../../components/admin/ProductTable';
import ProductForm from '../../components/admin/ProductForm';
import ProductSelector from '../../components/admin/ProductSelector';

import SupabaseSetup from '../../components/admin/SupabaseSetup';
import Toast from '../../components/admin/Toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SareeCollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'table' | 'form'>('table');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSupabaseSetup, setShowSupabaseSetup] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/sarees`);
      if (!response.ok) throw new Error('Failed to fetch sarees');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      showToast('Failed to load products from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setCurrentView('form');
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('form');
  };

  const handleDeleteProduct = async (id: string | number) => {
    try {
      const response = await fetch(`${API_URL}/api/sarees/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Saree deleted successfully!', 'success');
    } catch (error) {
      console.error('Failed to delete product:', error);
      showToast('Failed to delete saree. Please try again.', 'error');
    }
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      const isEdit = !!selectedProduct;
      const response = await fetch(`${API_URL}/api/sarees${isEdit ? `/${product.id}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error('Failed to save product');

      const saved = await response.json();
      setProducts(prev =>
        isEdit
          ? prev.map(p => p.id === saved.id ? saved : p)
          : [saved, ...prev]
      );
      showToast(`Saree ${isEdit ? 'updated' : 'added'} successfully!`, 'success');
      setCurrentView('table');
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
      showToast('Failed to save saree. Please try again.', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleLogout = () => {
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-50">
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-pink-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Saree Collection Management</h1>
                <p className="text-gray-600 mt-1">Manage your saree inventory, add new products, and update existing ones.</p>
              </div>
            </div>
            {currentView === 'table' && (
              <button
                onClick={handleAddNew}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Saree
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => {
                  setCurrentView('table');
                  setSelectedProduct(null);
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  currentView === 'table' ? 'border-pink-500 text-pink-600' : 'text-gray-500'
                }`}
              >
                View Collection ({products.length})
              </button>
              <button
                onClick={() => setCurrentView('form')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  currentView === 'form' ? 'border-pink-500 text-pink-600' : 'text-gray-500'
                }`}
              >
                {selectedProduct ? 'Edit Saree' : 'Add Saree'}
              </button>
            </nav>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <span className="ml-3 text-gray-600">Loading sarees from server...</span>
          </div>
        ) : currentView === 'table' ? (
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onSuccess={(message) => showToast(message, 'success')}
            onError={(message) => showToast(message, 'error')}
          />
        ) : (
          <div className="space-y-6">
            {products.length > 0 && (
              <ProductSelector
                products={products}
                selectedProduct={selectedProduct}
                onProductSelect={setSelectedProduct}
              />
            )}
            <ProductForm
              selectedProduct={selectedProduct}
              onSave={handleSaveProduct}
              onSuccess={(message) => showToast(message, 'success')}
              onError={(message) => showToast(message, 'error')}
            />
          </div>
        )}
      </div>

      {showSupabaseSetup && (
        <SupabaseSetup onClose={() => setShowSupabaseSetup(false)} />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
