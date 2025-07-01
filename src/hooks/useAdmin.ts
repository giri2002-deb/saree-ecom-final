import { useState, useEffect } from 'react';
import { AdminState, Product, Order } from '../types/admin';

export const useAdmin = () => {
  const [adminState, setAdminState] = useState<AdminState>({
    isAuthenticated: false,
    user: null,
    currentPage: 'dashboard'
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: "Elegant Red Silk Saree with Golden Border",
      price: 2499.00,
      originalPrice: 3499.00,
      category: 'Silk Sarees',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
      stock: 15,
      sold: 45,
      rating: 4.8,
      colors: ['red', 'gold'],
      sizes: ['Free Size'],
      description: 'Beautiful red silk saree with intricate golden border work, perfect for weddings and special occasions',
      featured: true,
      createdAt: '2024-01-15',
      fabric: 'Pure Silk',
      occasion: 'Wedding',
      style: 'Traditional'
    },
    {
      id: '2',
      name: 'Pink Floral Cotton Saree',
      price: 1299.00,
      category: 'Cotton Sarees',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500',
      stock: 25,
      sold: 32,
      rating: 4.6,
      colors: ['pink', 'green'],
      sizes: ['Free Size'],
      description: 'Comfortable cotton saree with beautiful floral prints, ideal for daily wear',
      featured: true,
      createdAt: '2024-01-10',
      fabric: 'Cotton',
      occasion: 'Casual',
      style: 'Printed'
    },
    {
      id: '3',
      name: 'Royal Blue Georgette Saree',
      price: 1899.00,
      originalPrice: 2499.00,
      category: 'Georgette Sarees',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
      stock: 18,
      sold: 28,
      rating: 4.7,
      colors: ['blue', 'silver'],
      sizes: ['Free Size'],
      description: 'Graceful georgette saree with silver embellishments, perfect for parties',
      featured: false,
      createdAt: '2024-01-05',
      fabric: 'Georgette',
      occasion: 'Party',
      style: 'Embellished'
    },
    {
      id: '4',
      name: 'Traditional Banarasi Silk Saree',
      price: 4999.00,
      category: 'Banarasi Sarees',
      image: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=500',
      stock: 8,
      sold: 15,
      rating: 4.9,
      colors: ['gold', 'maroon'],
      sizes: ['Free Size'],
      description: 'Authentic Banarasi silk saree with traditional zari work',
      featured: true,
      createdAt: '2024-01-03',
      fabric: 'Banarasi Silk',
      occasion: 'Festival',
      style: 'Traditional'
    },
    {
      id: '5',
      name: 'Green Chiffon Designer Saree',
      price: 1699.00,
      category: 'Designer Sarees',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
      stock: 22,
      sold: 38,
      rating: 4.5,
      colors: ['green', 'gold'],
      sizes: ['Free Size'],
      description: 'Modern designer saree in chiffon fabric with contemporary patterns',
      featured: false,
      createdAt: '2024-01-01',
      fabric: 'Chiffon',
      occasion: 'Office',
      style: 'Contemporary'
    },
    {
      id: '6',
      name: 'Black Net Saree with Sequins',
      price: 2199.00,
      category: 'Net Sarees',
      image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=500',
      stock: 12,
      sold: 25,
      rating: 4.4,
      colors: ['black', 'silver'],
      sizes: ['Free Size'],
      description: 'Elegant black net saree with sequin work, perfect for evening events',
      featured: true,
      createdAt: '2023-12-28',
      fabric: 'Net',
      occasion: 'Evening',
      style: 'Glamorous'
    }
  ]);

  const login = (email: string, password: string) => {
    // Simulate login - in real app, this would be an API call
    if (email === 'admin@saree.com' && password === 'admin123') {
      setAdminState({
        isAuthenticated: true,
        user: {
          id: '1',
          email: 'admin@saree.com',
          name: 'Saree Admin',
          role: 'admin'
        },
        currentPage: 'dashboard'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminState({
      isAuthenticated: false,
      user: null,
      currentPage: 'dashboard'
    });
  };

  const setCurrentPage = (page: string) => {
    setAdminState(prev => ({ ...prev, currentPage: page }));
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return {
    adminState,
    products,
    login,
    logout,
    setCurrentPage,
    addProduct,
    updateProduct,
    deleteProduct
  };
};