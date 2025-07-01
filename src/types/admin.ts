export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  stock: number;
  sold: number;
  rating: number;
  colors: string[];
  sizes: string[];
  description: string;
  featured: boolean;
  createdAt: string;
  fabric?: string;
  occasion?: string;
  style?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface AdminState {
  isAuthenticated: boolean;
  user: User | null;
  currentPage: string;
}

export interface ContentSection {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  content?: any;
}