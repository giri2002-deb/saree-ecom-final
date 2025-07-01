// pages/admin/AdminPage.tsx

import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Dashboard } from '../../components/admin/Dashboard';
import { Sidebar } from '../../components/admin/Sidebar';
import { LoginForm } from '../../components/admin/LoginForm';
import { ProductGrid } from '../../components/admin/ProductGrid';
import { ProductModal } from '../../components/admin/ProductModal';
import { ContentManagement } from '../../components/admin/ContentManagement';
import { Product } from '../../types/admin';
import SareeCollectionPage from './SareeCollectionPage';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('adminLoggedIn') === 'true';
  });

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    // your sample products here
  ]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const handleAddProduct = () => {
    setModalMode('add');
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleViewProduct = (product: Product) => {
    setModalMode('view');
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (modalMode === 'add') {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setProducts(prev => [...prev, newProduct]);
    } else if (modalMode === 'edit' && selectedProduct) {
      setProducts(prev =>
        prev.map(p =>
          p.id === selectedProduct.id
            ? { ...productData, id: selectedProduct.id, createdAt: selectedProduct.createdAt }
            : p
        )
      );
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentPage={window.location.pathname.replace('/admin/', '')}
        onPageChange={(page) => navigate(`/admin/${page}`)}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="saree-collection" element={<SareeCollectionPage />} />
          <Route
            path="products"
            element={
              <ProductGrid
                products={products}
                onAddProduct={handleAddProduct}
                onEditProduct={handleEditProduct}
                onViewProduct={handleViewProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            }
          />
          <Route path="home-banner" element={<ContentManagement page="home-banner" />} />
          <Route path="featured-collection" element={<ContentManagement page="featured-collection" />} />
          <Route path="about-banner" element={<ContentManagement page="about-banner" />} />
          <Route path="contact" element={<ContentManagement page="contact" />} />
          <Route path="*" element={<div className="p-6 text-center text-gray-500">Coming Soon</div>} />
        </Routes>
      </main>

      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        mode={modalMode}
      />
    </div>
  );
}
