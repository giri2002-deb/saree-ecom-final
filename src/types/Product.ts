export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  isNew: boolean;
  isFeatured: boolean;
  stack:number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  isNew: boolean;
  isFeatured: boolean;
  rating: string;
  stack:number;
}